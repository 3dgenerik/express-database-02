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
const usersStore_1 = require("../../models/usersStore");
const CustomError_1 = require("../../errors/CustomError");
const bodyValidationMiddleware_1 = require("../../middlewares/bodyValidationMiddleware");
let AuthUserController = class AuthUserController {
    authUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const store = new usersStore_1.UsersStore();
                const isUserExist = yield store.userExist(user.username);
                if (!isUserExist)
                    throw new CustomError_1.CustomError("User not found.", 401);
                const authUser = yield store.authUser(user);
                const isPasswordMatch = yield store.compareHash(user.password, authUser.password);
                if (!isPasswordMatch)
                    throw new CustomError_1.CustomError("Password doesn't match.", 401);
                res.send(authUser);
            }
            catch (err) {
                if (err instanceof CustomError_1.CustomError)
                    next(err);
                next(new CustomError_1.CustomError(`${err}`, 500));
            }
        });
    }
};
__decorate([
    (0, decorators_1.post)(`${"/users" /* AppRoutePaths.USER_ENDPOINTS */}/signin`),
    (0, decorators_1.middleware)((0, bodyValidationMiddleware_1.bodyValidationMiddleware)(["username", "password"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "authUser", null);
AuthUserController = __decorate([
    (0, decorators_1.controller)("/api" /* AppRoutePaths.CONTROLLER */)
], AuthUserController);