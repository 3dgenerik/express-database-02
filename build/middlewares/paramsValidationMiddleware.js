"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsValidationMiddleware = void 0;
const CustomError_1 = require("../errors/CustomError");
const isIdPositive = (id) => {
    if (Number.isNaN(id) || id < 1)
        throw new CustomError_1.CustomError('Id should be positive integer.', 422);
};
const paramsValidationMiddleware = () => {
    return (req, res, next) => {
        try {
            // eslint-disable-next-line no-constant-condition
            const id = parseInt(req.params.id);
            isIdPositive(id);
            next();
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                next(error);
            }
        }
    };
};
exports.paramsValidationMiddleware = paramsValidationMiddleware;
