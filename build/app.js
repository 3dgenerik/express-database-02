"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const catchErrorMiddleware_1 = require("./middlewares/catchErrorMiddleware");
const RouteApp_1 = require("./RouteApp");
require("./controllers/books/getBooksController");
require("./controllers/books/addBookController");
require("./controllers/books/getBookByIdController");
require("./controllers/books/updateBookController");
require("./controllers/books/deleteBook");
require("./controllers/users/getUsersController");
require("./controllers/users/createUserController");
require("./controllers/users/authUserController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(RouteApp_1.RouteApp.getInstance());
app.use(catchErrorMiddleware_1.catchErrorMiddleware);
app.listen(config_1.PORT, () => {
    console.log(`...listening port ${config_1.PORT}`);
});
exports.default = app;
