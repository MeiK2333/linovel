export declare class User {
    phone: string;
    logged: boolean;
    token: string;
    uid: number;
    nick: string;
    avatar: string;
    constructor(phone: string);
    /**
     * 发送登录验证码，没有注册的用户会自动注册
     */
    sendLoginPhoneMsg(): Promise<void>;
    /**
     * 使用验证码登录
     * @param code 验证码
     */
    loginByPhoneMsg(code: string): Promise<void>;
    /**
     * 使用账号密码登录
     * @param username 用户名或手机号
     * @param password 密码
     */
    login(username: string, password: string): Promise<void>;
    /**
     * 发送重置密码的验证码
     */
    sendForgetPwdPhoneMsg(): Promise<void>;
    /**
     * 使用验证码重置密码
     * @param code 验证码
     * @param newPassword 新的密码
     */
    resetPasswordByPhone(code: string, newPassword: string): Promise<void>;
    /**
     * 修改用户昵称，需要审核后才会成功，此处仅提交修改请求
     * @param newNickname 新的昵称
     */
    rename(newNickname: string): Promise<void>;
    /**
     * 每日签到
     */
    sign(): Promise<{
        total: number;
        base: number;
        extra: number;
        day: number;
    }>;
    /**
     * 领取月票
     */
    monthly(): Promise<{
        now: number;
        plus: number;
    }>;
    info(): Promise<any>;
}
