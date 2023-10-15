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
const decorators_1 = require("./decorators");
const CustomError_1 = require("../errors/CustomError");
const booksStore_1 = require("../models/booksStore");
const paramsValidationMiddleware_1 = require("../middlewares/paramsValidationMiddleware");
let UpdateBookController = 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UpdateBookController {
    updateBookController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const body = req.body;
            try {
                const store = new booksStore_1.BooksStore();
                const updatedBook = yield store.updateBook(Number(id), body);
                if (updatedBook)
                    res.send(updatedBook);
                else {
                    next(new CustomError_1.CustomError(`Book with id: ${id} doesn't exist in database.`, 422));
                }
            }
            catch (err) {
                next(new CustomError_1.CustomError(err, 422));
            }
        });
    }
};
__decorate([
    (0, decorators_1.put)(`${"/books" /* AppRoutePaths.ENDPOINTS */}/:id`),
    (0, decorators_1.middleware)((0, paramsValidationMiddleware_1.paramsValidationMiddleware)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UpdateBookController.prototype, "updateBookController", null);
UpdateBookController = __decorate([
    (0, decorators_1.controller)("/api" /* AppRoutePaths.CONTROLLER */)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
], UpdateBookController);
