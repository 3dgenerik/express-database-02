"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
require("reflect-metadata");
const validator = (keys) => {
    return (target, key) => {
        Reflect.defineMetadata("validator" /* AppFeatures.VALIDATOR */, [...keys], target, key);
    };
};
exports.validator = validator;
