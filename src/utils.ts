import * as crypto from 'crypto';

export function requestHeaders(data?: object, token?: string) {
    if (!data) {
        data = {};
    }
    if (!token) {
        token = '00000000000000000000000000000000';
    }
    const time = String(Math.floor(new Date().getTime() / 1000));
    const json = JSON.stringify(data);
    const sign = crypto.createHash('md5')
        .update(json + 'a03bb986d442275acfb7f6b4bf0ddbf5' + time)
        .digest('hex');
    const headers = {
        'X-SIGN-TIME': time,
        'X-TOKEN': token,
        'X-SIGN': sign,
        'X-JSON-PAYLOAD': '1',
        'X-DEVICE': '1',
        'X-APP-REV': '2020021602',
        'User-Agent': 'Dalvik/1.6.0 (Linux; U; Android 4.4.2; GT-N7100 Build/KOT49H)',
    };
    return headers;
}
