"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const RouteApp_1 = require("../../RouteApp");
const controller = (prefixRoute) => {
    const router = RouteApp_1.RouteApp.getInstance();
    return (target) => {
        const targetPrototypeNames = Object.getOwnPropertyNames(target.prototype);
        for (const key of targetPrototypeNames) {
            const path = Reflect.getMetadata("path" /* AppFeatures.PATH */, target.prototype, key);
            const method = Reflect.getMetadata("method" /* AppFeatures.METHOD */, target.prototype, key);
            const middlewares = Reflect.getMetadata("middleware" /* AppFeatures.MIDDLEWARE */, target.prototype, key) || [];
            if (path && method) {
                router[method](`${prefixRoute}${path}`, [...middlewares], target.prototype[key]);
            }
        }
    };
};
exports.controller = controller;
