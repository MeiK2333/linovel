import axios from 'axios';
import { linovelRequest } from './utils';
import { User } from './user';

interface BookChap {
  id: number
  name?: string
  rank?: number
  words?: number
  date?: number
}

interface BookVol {
  id: number
  about?: string
  name?: string
  rank?: number
  words?: number
  chaps?: Array<BookChap>
}

export class Book {
  id: number
  name: string
  about: string
  words: number
  vols: Array<BookVol>

  constructor(id: number) {
    this.id = id;
  }

  /**
   * 获得书籍的信息
   */
  async info() {
    const url = 'https://japari.qingzhiwenku.com/v3/book/info';
    const data = {
      'bid': this.id,
      'stat': 1
    };
    const resp = await linovelRequest(url, data);
    const book = resp.data.book;
    this.name = book.name;
    this.about = book.about;
    this.words = book.words;
    this.vols = book.vols;
  }
  /**
   * 收藏书籍
   * @param user 收藏的用户
   */
  async favorite(user: User) {
    const url = 'https://japari.qingzhiwenku.com/v1/book/favorite';
    const data = { 'bid': this.id };
    await linovelRequest(url, data, user);
  }
  /**
   * 取消收藏书籍
   * @param user 取消收藏的用户
   */
  async cancelFavorite(user: User) {
    const url = 'https://japari.qingzhiwenku.com/v1/book/cancelFavorite';
    const data = { 'bid': this.id };
    await linovelRequest(url, data, user);
  }
  /**
   * 使用墨水为书籍进行应援
   * @param user 应援的用户
   * @param value 应援的墨水数量
   */
  async reward(user: User, value: number) {
    if ([90, 666, 998, 3000, 10000, 50000].includes(value)) {
      throw new Error('墨水数值有误');
    }
    const url = 'https://japari.qingzhiwenku.com/v1/book/reward';
    const data = {
      'bid': this.id,
      'unit': 2,  // 墨水应援
      'value': value
    }
    await linovelRequest(url, data, user);
  }
  /**
   * 获取用户上次阅读到的地方
   * @param user 用户
   */
  async lastRead(user: User) {
    const url = 'https://japari.qingzhiwenku.com/v3/book/info';
    const data = {
      'bid': this.id,
      'stat': 1
    };
    const resp = await linovelRequest(url, data, user);
    return resp.data.data.statistics.lastRead as number;
  }
  /**
   * 阅读指定章节
   * @param chap 章节
   * @param user 用户
   */
  async read(chap: BookChap, user?: User) {
    const url = 'https://japari.qingzhiwenku.com/v3/book/read';
    const data = {
      'bid': this.id,
      'cid': chap.id
    }
    const resp = await linovelRequest(url, data, user);
    return resp.data as string;
  }
}
