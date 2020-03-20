import { User } from './user';
interface BookChap {
    id: number;
    name?: string;
    rank?: number;
    words?: number;
    date?: number;
}
interface BookVol {
    id: number;
    about?: string;
    name?: string;
    rank?: number;
    words?: number;
    chaps?: Array<BookChap>;
}
export declare class Book {
    id: number;
    name: string;
    about: string;
    words: number;
    vols: Array<BookVol>;
    constructor(id: number);
    /**
     * 获得书籍的信息
     */
    info(): Promise<void>;
    /**
     * 收藏书籍
     * @param user 收藏的用户
     */
    favorite(user: User): Promise<void>;
    /**
     * 取消收藏书籍
     * @param user 取消收藏的用户
     */
    cancelFavorite(user: User): Promise<void>;
    /**
     * 使用墨水为书籍进行应援
     * @param user 应援的用户
     * @param value 应援的墨水数量
     */
    reward(user: User, value: number): Promise<void>;
    /**
     * 获取用户上次阅读到的地方
     * @param user 用户
     */
    lastRead(user: User): Promise<number>;
    /**
     * 阅读指定章节
     * @param chap 章节
     * @param user 用户
     */
    read(chap: BookChap, user?: User): Promise<string>;
}
export {};
