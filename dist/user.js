"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var utils_1 = require("./utils");
var User = /** @class */ (function () {
    function User(phone) {
        this.logged = false;
        this.token = '00000000000000000000000000000000';
        this.phone = phone;
    }
    /**
     * 发送登录验证码，没有注册的用户会自动注册
     */
    User.prototype.sendLoginPhoneMsg = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v3/send/loginPhoneMsg';
                        data = { 'auto_reg': 1, 'input': this.phone };
                        return [4 /*yield*/, axios_1.default.post(url, data, {
                                headers: utils_1.requestHeaders(data)
                            })];
                    case 1:
                        resp = _a.sent();
                        if (resp.data.code !== 0) {
                            throw new Error(resp.data.msg);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 使用验证码登录
     * @param code 验证码
     */
    User.prototype.loginByPhoneMsg = function (code) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v3/auth/login';
                        data = { 'input': this.phone, 'code': code, 'lgt': 'phone' };
                        return [4 /*yield*/, axios_1.default.post(url, data, {
                                headers: utils_1.requestHeaders(data)
                            })];
                    case 1:
                        resp = _a.sent();
                        if (resp.data.code !== 0) {
                            throw new Error(resp.data.msg);
                        }
                        this.token = resp.data.data.token.token;
                        this.uid = resp.data.data.token.uid;
                        this.nick = resp.data.data.token.nick;
                        this.avatar = resp.data.data.token.avatar;
                        this.logged = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 使用账号密码登录
     * @param username 用户名或手机号
     * @param password 密码
     */
    User.prototype.login = function (username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v3/auth/login';
                        data = { 'input': username, 'password': password };
                        return [4 /*yield*/, axios_1.default.post(url, data, {
                                headers: utils_1.requestHeaders(data)
                            })];
                    case 1:
                        resp = _a.sent();
                        if (resp.data.code !== 0) {
                            throw new Error(resp.data.msg);
                        }
                        this.token = resp.data.data.token.token;
                        this.uid = resp.data.data.token.uid;
                        this.nick = resp.data.data.token.nick;
                        this.avatar = resp.data.data.token.avatar;
                        this.logged = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 发送重置密码的验证码
     */
    User.prototype.sendForgetPwdPhoneMsg = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v3/send/forgetPwdPhoneMsg';
                        data = { 'input': this.phone };
                        return [4 /*yield*/, axios_1.default.post(url, data, {
                                headers: utils_1.requestHeaders(data)
                            })];
                    case 1:
                        resp = _a.sent();
                        if (resp.data.code !== 0) {
                            throw new Error(resp.data.msg);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 使用验证码重置密码
     * @param code 验证码
     * @param newPassword 新的密码
     */
    User.prototype.resetPasswordByPhone = function (code, newPassword) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v3/auth/resetPasswordByPhone';
                        data = { 'input': this.phone, 'password': newPassword, 'code': code };
                        return [4 /*yield*/, axios_1.default.post(url, data, {
                                headers: utils_1.requestHeaders(data)
                            })];
                    case 1:
                        resp = _a.sent();
                        if (resp.data.code !== 0) {
                            throw new Error(resp.data.msg);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 修改用户昵称，需要审核后才会成功，此处仅提交修改请求
     * @param newNickname 新的昵称
     */
    User.prototype.rename = function (newNickname) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v3/my/updateProfile';
                        data = { 'nick': newNickname };
                        return [4 /*yield*/, axios_1.default.post(url, data, {
                                headers: utils_1.requestHeaders(data, this.token)
                            })];
                    case 1:
                        resp = _a.sent();
                        if (resp.data.code !== 0) {
                            throw new Error(resp.data.msg);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 每日签到
     */
    User.prototype.sign = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v1/my/sign';
                        data = {};
                        return [4 /*yield*/, axios_1.default.post(url, data, {
                                headers: utils_1.requestHeaders(data, this.token)
                            })];
                    case 1:
                        resp = _a.sent();
                        if (resp.data.code !== 0) {
                            throw new Error(resp.data.msg);
                        }
                        return [2 /*return*/, resp.data.data];
                }
            });
        });
    };
    /**
     * 领取月票
     */
    User.prototype.monthly = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v1/my/getMonthlyTicket';
                        data = {};
                        return [4 /*yield*/, axios_1.default.post(url, data, {
                                headers: utils_1.requestHeaders(data, this.token)
                            })];
                    case 1:
                        resp = _a.sent();
                        if (resp.data.code !== 0) {
                            throw new Error(resp.data.msg);
                        }
                        return [2 /*return*/, resp.data.data];
                }
            });
        });
    };
    return User;
}());
exports.User = User;
