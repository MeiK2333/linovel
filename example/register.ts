import axios from 'axios';
import { User } from '../src/user';
import { promises } from 'fs';

require('dotenv').config();

(async () => {
  for (let i = 0; i < 150; i++) {
    try {
      const { username, password } = await register();
      console.log(username, password);
      // 追加新的数据到文件中
      const file = await promises.readFile('users.json');
      const users: Array<{ username: string, password: string }> = JSON.parse(file.toString());
      users.push({ username, password });
      await promises.writeFile('users.json', JSON.stringify(users, null, 2));
      // 隔五分钟到十分钟注册一个
      const rand = Math.random() * 5 + 5;
      await sleep(rand * 60 * 1000);
    } catch (err) {
      console.error(err);
    }
  }
})();

async function requestService() {
  const service = axios.create();

  service.interceptors.response.use(response => {
    if (response.data.split('|')[0] !== '0') {
      return Promise.reject(new Error(response.data));
    }
    return response.data.split('|');
  })
  return service;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCode(objId: string, phone: string) {
  const token = process.env.TOKEN;
  const request = await requestService();
  let code = null;
  await sleep(1000);
  // 获取当前的号码
  await request.get(`http://openapi.92jindou.com/api/specified?sid=${objId}&phone=${phone}&token=${token}`);
  // 循环等待验证码，最多尝试十次
  for (let i = 0; i < 10; i++) {
    // console.log(`${phone} 尝试获取验证码`);
    await sleep(6000);
    const codeRes = await request.get(`http://openapi.92jindou.com/api/getMessage?sid=${objId}&phone=${phone}&token=${token}`);
    if (codeRes[1] !== '未收到短信') {
      code = codeRes[2];
      console.log(`${phone} 获取验证码成功：${code}`);
      break;
    }
    // console.log(`${phone} 未获取到验证码`)
  }
  // 如果没能获取到验证码
  if (code === null) {
    console.log(`释放手机号：${phone}`);
    await request.get(`http://openapi.92jindou.com/api/cancelRecv?sid=${objId}&phone=${phone}&token=${token}`);
    throw new Error('获取验证码失败');
  }
  return code;
}

async function register() {
  const token = process.env.TOKEN;
  const request = await requestService();
  // 检查余额
  const summaryRes = await request.get(`http://openapi.92jindou.com/api/getSummary?token=${token}`);
  const summary = Number(summaryRes[1]);
  console.log(`余额：${summary}`);
  if (summary < 1) {
    throw new Error('余额不足，请充值');
  }
  // 获取手机号
  const objId = '11672';
  const phoneResp = await request.get(`http://openapi.92jindou.com/api/getPhone?sid=${objId}&token=${token}`);
  const phone = phoneResp[1];
  const username = phone;
  const password = process.env.REF + phone;
  console.log(`获取到手机号：${phone}`);
  // 释放手机号，需要获取验证码的时候再进行锁定
  await request.get(`http://openapi.92jindou.com/api/cancelRecv?sid=${objId}&phone=${phone}&token=${token}`);

  // 注册账号
  const user = new User(phone);
  // 发送请求
  await user.sendLoginPhoneMsg();
  console.log(`${phone} 发送注册请求`);
  let code = await getCode(objId, phone);
  // 使用验证码注册
  await user.loginByPhoneMsg(code);
  console.log(`${phone} 注册成功`);
  // 注册后过一分钟再修改密码
  await sleep(60000);

  // 修改密码
  // 发送重置密码请求
  console.log(`${phone} 发送重置密码请求`);
  await user.sendForgetPwdPhoneMsg();
  code = await getCode(objId, phone);
  await user.resetPasswordByPhone(code, password);
  console.log(`${phone} 重置密码成功`);

  return { username, password }
}
