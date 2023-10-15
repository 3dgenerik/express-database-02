"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const CustomError_1 = require("../../errors/CustomError");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const catchError = (target, key, descriptor) => {
    const method = descriptor.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (...args) {
        console.log('xxxxxxxx: ', args);
        try {
            return method.apply(target, args);
        }
        catch (error) {
            throw new CustomError_1.CustomError(`Special error message:`, 422);
        }
    };
};
exports.catchError = catchError;
