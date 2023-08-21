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
exports.verifyToken = exports.genToken = exports.verifyHash = exports.hashString = exports.sendResponse = exports.getPrisma = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let prisma = null;
function getPrisma() {
    if (!prisma) {
        prisma = new client_1.PrismaClient();
    }
    return prisma;
}
exports.getPrisma = getPrisma;
function sendResponse(res, data, message = null, status = 200, total = null, token = null) {
    const jsonObject = {
        data,
        message: "Success!",
    };
    if (message) {
        jsonObject["message"] = message;
    }
    if (total) {
        jsonObject["total"] = total;
    }
    if (token) {
        jsonObject["token"] = token;
    }
    res.status(status).json(jsonObject);
    return;
}
exports.sendResponse = sendResponse;
function hashString(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(data, salt);
        return hash;
    });
}
exports.hashString = hashString;
function verifyHash(data, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = yield bcrypt_1.default.compare(data, hash);
        return isValid;
    });
}
exports.verifyHash = verifyHash;
function genToken(payload) {
    const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET, {
        expiresIn: "30d",
    });
    return token;
}
exports.genToken = genToken;
function verifyToken(token) {
    const secret = process.env.SECRET;
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        return payload;
    }
    catch (error) {
        return null;
    }
}
exports.verifyToken = verifyToken;
// export const decodeToken = (token: string) => {
//   const secret = process.env.SECRET as string;
//   try {
//     const payload = jwt.verify(token, secret);
//     return payload;
//   } catch (error) {
//     return null;
//   }
// };
