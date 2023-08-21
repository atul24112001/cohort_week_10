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
exports.checkAuth = void 0;
const db_error_1 = __importDefault(require("../utils/db-error"));
const functions_1 = require("../utils/functions");
function checkAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorization = req.header("authorization");
            const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
            const prisma = (0, functions_1.getPrisma)();
            if (!token) {
                (0, db_error_1.default)(res, "Token is not provided.", 400);
                return;
            }
            const payload = (0, functions_1.verifyToken)(token);
            if (!payload) {
                (0, db_error_1.default)(res, "Token is not Valid.", 400);
                return;
            }
            const user = yield prisma.user.findFirst({
                where: {
                    id: payload.id,
                },
            });
            if (!user) {
                (0, db_error_1.default)(res, "User not found!", 404);
                return;
            }
            if (user.token !== token) {
                (0, db_error_1.default)(res, "Unauthorized token!", 401);
                return;
            }
            req.currentUser = payload;
            next();
            return;
        }
        catch (error) {
            (0, db_error_1.default)(res, error);
        }
    });
}
exports.checkAuth = checkAuth;
