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
exports.verifyUserToken = exports.login = exports.signup = void 0;
const db_error_1 = __importDefault(require("../utils/db-error"));
const cohort_todo_common_1 = require("@atul24112001/cohort_todo_common");
const functions_1 = require("../utils/functions");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedBody = cohort_todo_common_1.authenticationInput.safeParse(req.body);
            if (!parsedBody.success) {
                res.status(411).json({
                    message: parsedBody.error.message,
                });
                return;
            }
            const prisma = (0, functions_1.getPrisma)();
            const userExist = yield prisma.user.findFirst({
                where: {
                    email: parsedBody.data.email,
                },
            });
            if (userExist) {
                (0, db_error_1.default)(res, "User already exist, please login");
                return;
            }
            const hashedPassword = yield (0, functions_1.hashString)(parsedBody.data.password);
            const newUser = yield prisma.user.create({
                data: {
                    email: parsedBody.data.email,
                    password: hashedPassword,
                },
            });
            const payload = JSON.parse(JSON.stringify(newUser));
            delete payload["password"];
            delete payload["token"];
            const token = (0, functions_1.genToken)(payload);
            yield prisma.user.update({
                where: {
                    id: newUser.id,
                },
                data: {
                    token,
                },
            });
            (0, functions_1.sendResponse)(res, [payload], "Signup Successfully!", 201, null, token);
            return;
        }
        catch (error) {
            (0, db_error_1.default)(res, error);
        }
    });
}
exports.signup = signup;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedBody = cohort_todo_common_1.authenticationInput.safeParse(req.body);
            if (!parsedBody.success) {
                res.status(411).json({
                    message: parsedBody.error.message,
                });
                return;
            }
            const prisma = (0, functions_1.getPrisma)();
            const userExist = yield prisma.user.findFirst({
                where: {
                    email: parsedBody.data.email,
                },
            });
            if (!userExist) {
                (0, db_error_1.default)(res, "User doesn't exist, please signup");
                return;
            }
            const validPassword = yield (0, functions_1.verifyHash)(parsedBody.data.password, userExist.password);
            if (!validPassword) {
                (0, db_error_1.default)(res, "Incorrect Password");
                return;
            }
            const payload = JSON.parse(JSON.stringify(userExist));
            delete payload["password"];
            delete payload["token"];
            const token = (0, functions_1.genToken)(payload);
            yield prisma.user.update({
                where: {
                    id: userExist.id,
                },
                data: {
                    token,
                },
            });
            (0, functions_1.sendResponse)(res, [payload], "Login Successfully!", 200, null, token);
            return;
        }
        catch (error) {
            (0, db_error_1.default)(res, error);
        }
    });
}
exports.login = login;
function verifyUserToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.currentUser);
            res.status(200).json({
                message: "Login successfully!",
            });
            return;
        }
        catch (error) {
            (0, db_error_1.default)(res, error);
        }
    });
}
exports.verifyUserToken = verifyUserToken;
