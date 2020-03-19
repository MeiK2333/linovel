import axios from 'axios';
import { requestHeaders } from './utils';

export class User {
  phone: string
  logged: boolean = false
  token: string = '00000000000000000000000000000000'

  uid: number
  nick: string
  avatar: string

  constructor(phone: string) {
    this.phone = phone
  }

  /**
   * 发送登录验证码，没有注册的用户会自动注册
   */
  async sendLoginPhoneMsg() {
    const url = 'https://japari.qingzhiwenku.com/v3/send/loginPhoneMsg';
    const data = { 'auto_reg': 1, 'input': this.phone };
    const resp = await axios.post(url, data, {
      headers: requestHeaders(data)
    });
    if (resp.data.code !== 0) {
      throw new Error(resp.data.msg);
    }
  }
  /**
   * 使用验证码登录
   * @param code 验证码
   */
  async loginByPhoneMsg(code: string) {
    const url = 'https://japari.qingzhiwenku.com/v3/auth/login'
    const data = { 'input': this.phone, 'code': code, 'lgt': 'phone' }
    const resp = await axios.post(url, data, {
      headers: requestHeaders(data)
    });
    if (resp.data.code !== 0) {
      throw new Error(resp.data.msg);
    }
    this.token = resp.data.data.token.token;
    this.uid = resp.data.data.token.uid;
    this.nick = resp.data.data.token.nick;
    this.avatar = resp.data.data.token.avatar;
    this.logged = true
  }
  /**
   * 使用账号密码登录
   * @param username 用户名或手机号
   * @param password 密码
   */
  async login(username: string, password: string) {
    const url = 'https://japari.qingzhiwenku.com/v3/auth/login';
    const data = { 'input': username, 'password': password };
    const resp = await axios.post(url, data, {
      headers: requestHeaders(data)
    });
    if (resp.data.code !== 0) {
      throw new Error(resp.data.msg);
    }
    this.token = resp.data.data.token.token;
    this.uid = resp.data.data.token.uid;
    this.nick = resp.data.data.token.nick;
    this.avatar = resp.data.data.token.avatar;
    this.logged = true
  }
  /**
   * 发送重置密码的验证码
   */
  async sendForgetPwdPhoneMsg() {
    const url = 'https://japari.qingzhiwenku.com/v3/send/forgetPwdPhoneMsg';
    const data = { 'input': this.phone };
    const resp = await axios.post(url, data, {
      headers: requestHeaders(data)
    });
    if (resp.data.code !== 0) {
      throw new Error(resp.data.msg);
    }
  }
  /**
   * 使用验证码重置密码
   * @param code 验证码
   * @param newPassword 新的密码
   */
  async resetPasswordByPhone(code: string, newPassword: string) {
    const url = 'https://japari.qingzhiwenku.com/v3/auth/resetPasswordByPhone';
    const data = { 'input': this.phone, 'password': newPassword, 'code': code };
    const resp = await axios.post(url, data, {
      headers: requestHeaders(data)
    });
    if (resp.data.code !== 0) {
      throw new Error(resp.data.msg);
    }
  }
  /**
   * 修改用户昵称，需要审核后才会成功，此处仅提交修改请求
   * @param newNickname 新的昵称
   */
  async rename(newNickname: string) {
    const url = 'https://japari.qingzhiwenku.com/v3/my/updateProfile';
    const data = { 'nick': newNickname };
    const resp = await axios.post(url, data, {
      headers: requestHeaders(data, this.token)
    });
    if (resp.data.code !== 0) {
      throw new Error(resp.data.msg);
    }
  }
  /**
   * 每日签到
   */
  async sign(): Promise<{
    total: number;
    base: number;
    extra: number;
    day: number;
  }> {
    const url = 'https://japari.qingzhiwenku.com/v1/my/sign';
    const data = {};
    const resp = await axios.post(url, data, {
      headers: requestHeaders(data, this.token)
    });
    if (resp.data.code !== 0) {
      throw new Error(resp.data.msg);
    }
    return resp.data.data;
  }
  /**
   * 领取月票
   */
  async monthly(): Promise<{
    now: number;
    plus: number;
  }> {
    const url = 'https://japari.qingzhiwenku.com/v1/my/getMonthlyTicket';
    const data = {};
    const resp = await axios.post(url, data, {
      headers: requestHeaders(data, this.token)
    });
    if (resp.data.code !== 0) {
      throw new Error(resp.data.msg);
    }
    return resp.data.data;
  }
}