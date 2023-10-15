"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchErrorMiddleware = void 0;
const catchErrorMiddleware = (err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    const error = err.formatError();
    res.status(error.statusCode).send(error.message);
};
exports.catchErrorMiddleware = catchErrorMiddleware;
