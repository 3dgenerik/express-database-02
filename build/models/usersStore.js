"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
class UsersStore {
    createHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt_1.default.hash(password, parseInt(config_1.SALT_ROUND));
            return hash;
        });
    }
    compareHash(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield bcrypt_1.default.compare(password, hash);
            return isMatch;
        });
    }
    userExist() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'INSERT INTO users (username, password_hash) VALUES($1, $2) RETURNING *';
            const hash = yield this.createHash(user.password);
            const result = yield conn.query(sql, [user.username, hash]);
            conn.release();
            return result.rows[0];
        });
    }
}
exports.UsersStore = UsersStore;
