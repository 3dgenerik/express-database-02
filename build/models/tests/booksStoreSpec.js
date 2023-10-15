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
Object.defineProperty(exports, "__esModule", { value: true });
const booksStore_1 = require("../booksStore");
const store = new booksStore_1.BooksStore();
const newBook = {
    name: 'Omama',
    author: 'Slobodan Vladusic',
    pages: 278,
};
describe('Testing library: ', () => {
    it('Getting all books: ', () => __awaiter(void 0, void 0, void 0, function* () {
        const allBooks = yield store.index();
        console.log(allBooks);
        expect(allBooks).toBeDefined();
    }));
    it('Get book by id: ', () => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield store.getById(2);
        console.log(book);
        expect(book.author).toEqual('Dragos Kalajic');
    }));
    fit('Add book: ', () => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield store.createBook(newBook);
        console.log(book);
        expect(book).toBeDefined();
    }));
});
