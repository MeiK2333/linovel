import * as crypto from 'crypto';
import * as UserAgent from 'user-agents';

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
  const userAgent = new UserAgent({ deviceCategory: 'mobile' });
  const headers = {
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
