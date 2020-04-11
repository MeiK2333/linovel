import axios from 'axios';
import { linovelRequest } from './utils';

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
    await linovelRequest(url, data);
  }
  /**
   * 使用验证码登录
   * @param code 验证码
   */
  async loginByPhoneMsg(code: string) {
    const url = 'https://japari.qingzhiwenku.com/v3/auth/login';
    const data = { 'input': this.phone, 'code': code, 'lgt': 'phone' };
    const resp = await linovelRequest(url, data);
    this.token = resp.data.token.token;
    this.uid = resp.data.token.uid;
    this.nick = resp.data.token.nick;
    this.avatar = 'https://avatar.linovel.net/' + resp.data.token.avatar;
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
    const resp = await linovelRequest(url, data);
    this.token = resp.data.token.token;
    this.uid = resp.data.token.uid;
    this.nick = resp.data.token.nick;
    this.avatar = 'https://avatar.linovel.net/' + resp.data.token.avatar;
    this.logged = true
  }
  /**
   * 发送重置密码的验证码
   */
  async sendForgetPwdPhoneMsg() {
    const url = 'https://japari.qingzhiwenku.com/v3/send/forgetPwdPhoneMsg';
    const data = { 'input': this.phone };
    await linovelRequest(url, data);
  }
  /**
   * 使用验证码重置密码
   * @param code 验证码
   * @param newPassword 新的密码
   */
  async resetPasswordByPhone(code: string, newPassword: string) {
    const url = 'https://japari.qingzhiwenku.com/v3/auth/resetPasswordByPhone';
    const data = { 'input': this.phone, 'password': newPassword, 'code': code };
    await linovelRequest(url, data);
  }
  /**
   * 修改用户昵称，需要审核后才会成功，此处仅提交修改请求
   * @param newNickname 新的昵称
   */
  async rename(newNickname: string) {
    const url = 'https://japari.qingzhiwenku.com/v3/my/updateProfile';
    const data = { 'nick': newNickname };
    await linovelRequest(url, data, this);
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
    const resp = await linovelRequest(url, data, this);
    return resp.data;
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
    const resp = await linovelRequest(url, data, this);
    return resp.data;
  }
  async info() {
    const url = 'https://japari.qingzhiwenku.com/v1/user/info';
    const data = { "uid": this.uid };
    const resp = await linovelRequest(url, data, this);
    this.uid = resp.data.user.id;
    this.nick = resp.data.user.nick;
    this.avatar = 'https://avatar.linovel.net/' + resp.data.user.avatar;
    return resp.data.user;
  }
}