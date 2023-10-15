"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.del = exports.post = exports.get = void 0;
require("reflect-metadata");
const routesWrapes = (method) => {
    return (path) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (target, key) => {
            Reflect.defineMetadata("path" /* AppFeatures.PATH */, path, target, key);
            Reflect.defineMetadata("method" /* AppFeatures.METHOD */, method, target, key);
        };
    };
};
exports.get = routesWrapes("get" /* AppMethods.GET */);
exports.post = routesWrapes("post" /* AppMethods.POST */);
exports.del = routesWrapes("delete" /* AppMethods.DELETE */);
exports.put = routesWrapes("put" /* AppMethods.PUT */);
