"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const CustomError_1 = require("../errors/CustomError");
const validationMiddleware = () => {
    return (req, res, next) => {
        try {
            // eslint-disable-next-line no-constant-condition
            if (false) {
                throw new CustomError_1.CustomError('TEST GRESKA', 422);
            }
            next();
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                next(error);
            }
        }
    };
};
exports.validationMiddleware = validationMiddleware;
