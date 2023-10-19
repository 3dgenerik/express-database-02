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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../decorators");
const CustomError_1 = require("../../errors/CustomError");
const usersStore_1 = require("../../models/usersStore");
const bodyValidationMiddleware_1 = require("../../middlewares/bodyValidationMiddleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
let CreateUserController = 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class CreateUserController {
    createUSer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = {
                username,
                password
            };
            try {
                const store = new usersStore_1.UsersStore();
                const isUserExist = yield store.userExist(user.username);
                if (isUserExist)
                    throw new CustomError_1.CustomError('User already exists.', 422);
                const addedUser = yield store.createUser(user);
                const token = jsonwebtoken_1.default.sign({ user: addedUser }, config_1.TOKEN_SECRET);
                res.send(token);
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
    (0, decorators_1.post)(`${"/users" /* AppRoutePaths.USER_ENDPOINTS */}/signup`),
    (0, decorators_1.middleware)((0, bodyValidationMiddleware_1.bodyValidationMiddleware)(["username", "password"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CreateUserController.prototype, "createUSer", null);
CreateUserController = __decorate([
    (0, decorators_1.controller)("/api" /* AppRoutePaths.CONTROLLER */)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
], CreateUserController);
