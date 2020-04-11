"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var crypto_1 = tslib_1.__importDefault(require("crypto"));
var user_agents_1 = tslib_1.__importDefault(require("user-agents"));
var axios_1 = tslib_1.__importDefault(require("axios"));
function linovelRequest(url, data, user) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var resp;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post(url, data, {
                        headers: user ? requestHeaders(data, user.token) : requestHeaders(data)
                    })];
                case 1:
                    resp = _a.sent();
                    if (resp.data.code !== 0) {
                        throw new Error(resp.data.msg);
                    }
                    return [2 /*return*/, resp.data];
            }
        });
    });
}
exports.linovelRequest = linovelRequest;
function requestHeaders(data, token) {
    if (!data) {
        data = {};
    }
    if (!token) {
        token = '00000000000000000000000000000000';
    }
    var time = String(Math.floor(new Date().getTime() / 1000));
    var json = JSON.stringify(data);
    var sign = crypto_1.default.createHash('md5')
        .update(json + 'a03bb986d442275acfb7f6b4bf0ddbf5' + time)
        .digest('hex');
    var userAgent = new user_agents_1.default({ deviceCategory: 'mobile' });
    var headers = {
        'X-SIGN-TIME': time,
        'X-TOKEN': token,
        'X-SIGN': sign,
        'X-JSON-PAYLOAD': '1',
        'X-DEVICE': '1',
        'X-APP-REV': '2020021602',
        'User-Agent': userAgent.userAgent,
    };
    return headers;
}
