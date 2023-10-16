"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksStore = void 0;
const database_1 = __importDefault(require("../database"));
class BooksStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT * FROM books';
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        });
    }
    bookExist(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const allBooks = yield this.index();
            for (const item of allBooks) {
                if (item.name === book.name && item.author === book.author && item.pages === book.pages) {
                    return true;
                }
            }
            return false;
        });
    }
    idExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allBooks = yield this.index();
            for (const item of allBooks) {
                if (item.id === id) {
                    return true;
                }
            }
            return false;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT * FROM books WHERE id=($1)';
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'INSERT INTO books (name, author, pages) VALUES($1, $2, $3) RETURNING *';
            const result = yield conn.query(sql, [
                book.name,
                book.author,
                book.pages,
            ]);
            conn.release();
            return result.rows[0];
        });
    }
    updateBook(id, book) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const getBookByID = yield this.getById(id);
            const name = getBookByID ? ((_b = (_a = book.name) !== null && _a !== void 0 ? _a : getBookByID.name) !== null && _b !== void 0 ? _b : '') : '';
            const author = getBookByID ? ((_d = (_c = book.author) !== null && _c !== void 0 ? _c : getBookByID.author) !== null && _d !== void 0 ? _d : '') : '';
            const pages = getBookByID ? ((_f = (_e = book.pages) !== null && _e !== void 0 ? _e : getBookByID.pages) !== null && _f !== void 0 ? _f : 0) : 0;
            const conn = yield database_1.default.connect();
            const sql = 'UPDATE books SET name = ($1), author = ($2), pages = ($3) WHERE id = ($4) RETURNING *';
            const result = yield conn.query(sql, [name, author, pages, id]);
            conn.release();
            return result.rows[0];
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'DELETE FROM books WHERE id = ($1) RETURNING *';
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
}
exports.BooksStore = BooksStore;
