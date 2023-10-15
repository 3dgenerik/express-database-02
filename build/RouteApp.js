"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteApp = void 0;
const express_1 = __importDefault(require("express"));
class RouteApp {
    static getInstance() {
        if (!RouteApp.instance) {
            RouteApp.instance = express_1.default.Router();
        }
        return RouteApp.instance;
    }
}
exports.RouteApp = RouteApp;
