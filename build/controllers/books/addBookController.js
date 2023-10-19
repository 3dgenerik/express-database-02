"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const decorators_1 = require("../decorators");
const booksStore_1 = require("../../models/booksStore");
const CustomError_1 = require("../../errors/CustomError");
const verifyAuthToken_1 = require("../../middlewares/verifyAuthToken");
let addBookController = 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class addBookController {
    addBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = {
                name: req.body.name,
                author: req.body.author,
                pages: req.body.pages
            };
            const store = new booksStore_1.BooksStore();
            try {
                if (!(yield store.bookExist(book))) {
                    const returnBook = yield store.createBook(book);
                    res.send(returnBook);
                }
                else {
                    throw new CustomError_1.CustomError(`Book with name ${book.name}, author ${book.author}, pages ${book.pages} already exists.`, 422);
                }
            }
            catch (err) {
                if (err instanceof CustomError_1.CustomError)
                    next(err);
                next(new CustomError_1.CustomError(`${err}`, 422));
            }
        });
    }
};
__decorate([
    (0, decorators_1.post)("/books" /* AppRoutePaths.ENDPOINTS */),
    (0, decorators_1.middleware)((0, verifyAuthToken_1.verifyAuthToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], addBookController.prototype, "addBook", null);
addBookController = __decorate([
    (0, decorators_1.controller)("/api" /* AppRoutePaths.CONTROLLER */)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
], addBookController);
