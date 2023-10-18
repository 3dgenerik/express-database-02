"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidationMiddleware = void 0;
const CustomError_1 = require("../errors/CustomError");
const bodyValidationMiddleware = (keys) => {
    return (req, res, next) => {
        try {
            const user = req.body;
            for (const key of keys) {
                if (!user[key]) {
                    throw new CustomError_1.CustomError('Please provide valid username or password', 422);
                }
            }
            const isUserNameNum = Number.isNaN(Number(user.username));
            if (!isUserNameNum) {
                throw new CustomError_1.CustomError(`Username can't be a number.`, 422);
            }
            next();
        }
        catch (err) {
            if (err instanceof CustomError_1.CustomError)
                next(err);
        }
    };
};
exports.bodyValidationMiddleware = bodyValidationMiddleware;
