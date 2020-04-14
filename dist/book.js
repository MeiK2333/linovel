"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var Book = /** @class */ (function () {
    function Book(id) {
        this.id = id;
    }
    /**
     * 获得书籍的信息
     */
    Book.prototype.info = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp, book;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v3/book/info';
                        data = {
                            'bid': this.id,
                            'stat': 1
                        };
                        return [4 /*yield*/, utils_1.linovelRequest(url, data)];
                    case 1:
                        resp = _a.sent();
                        book = resp.data.book;
                        this.name = book.name;
                        this.about = book.about;
                        this.words = book.words;
                        this.vols = book.vols;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 收藏书籍
     * @param user 收藏的用户
     */
    Book.prototype.favorite = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v1/book/favorite';
                        data = { 'bid': this.id };
                        return [4 /*yield*/, utils_1.linovelRequest(url, data, user)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 取消收藏书籍
     * @param user 取消收藏的用户
     */
    Book.prototype.cancelFavorite = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v1/book/cancelFavorite';
                        data = { 'bid': this.id };
                        return [4 /*yield*/, utils_1.linovelRequest(url, data, user)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 使用墨水为书籍进行应援
     * @param user 应援的用户
     * @param value 应援的墨水数量
     */
    Book.prototype.reward = function (user, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ([90, 666, 998, 3000, 10000, 50000].includes(value)) {
                            throw new Error('墨水数值有误');
                        }
                        url = 'https://japari.qingzhiwenku.com/v1/book/reward';
                        data = {
                            'bid': this.id,
                            'unit': 2,
                            'value': value
                        };
                        return [4 /*yield*/, utils_1.linovelRequest(url, data, user)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取用户上次阅读到的地方
     * @param user 用户
     */
    Book.prototype.lastRead = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v3/book/info';
                        data = {
                            'bid': this.id,
                            'stat': 1
                        };
                        return [4 /*yield*/, utils_1.linovelRequest(url, data, user)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.data.data.statistics.lastRead];
                }
            });
        });
    };
    /**
     * 阅读指定章节
     * @param chap 章节
     * @param user 用户
     */
    Book.prototype.read = function (chap, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, data, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://japari.qingzhiwenku.com/v3/book/read';
                        data = {
                            'bid': this.id,
                            'cid': chap.id
                        };
                        return [4 /*yield*/, utils_1.linovelRequest(url, data, user)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.data];
                }
            });
        });
    };
    return Book;
}());
exports.Book = Book;
