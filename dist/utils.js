"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var crypto = tslib_1.__importStar(require("crypto"));
var UserAgent = tslib_1.__importStar(require("user-agents"));
function requestHeaders(data, token) {
    if (!data) {
        data = {};
    }
    if (!token) {
        token = '00000000000000000000000000000000';
    }
    var time = String(Math.floor(new Date().getTime() / 1000));
    var json = JSON.stringify(data);
    var sign = crypto.createHash('md5')
        .update(json + 'a03bb986d442275acfb7f6b4bf0ddbf5' + time)
        .digest('hex');
    var userAgent = new UserAgent({ deviceCategory: 'mobile' });
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
exports.requestHeaders = requestHeaders;
