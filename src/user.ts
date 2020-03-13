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
   * 发送登录验证码
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
    this.token = resp.data.token.token;
    this.uid = resp.data.token.uid;
    this.nick = resp.data.token.nick;
    this.avatar = resp.data.token.avatar;
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
    this.token = resp.data.token.token;
    this.uid = resp.data.token.uid;
    this.nick = resp.data.token.nick;
    this.avatar = resp.data.token.avatar;
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
}