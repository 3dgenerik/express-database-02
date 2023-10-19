"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const CustomError_1 = require("../errors/CustomError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const verifyAuthToken = () => {
    return (req, res, next) => {
        try {
            const authorizationHeader = req.headers.authorization;
            console.log('SA MIDLEWARE: ', req.headers);
            const token = (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1]) || "";
            const decoded = jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET);
            next();
        }
        catch (error) {
            next(new CustomError_1.CustomError(`${error}`, 401));
        }
    };
};
exports.verifyAuthToken = verifyAuthToken;
