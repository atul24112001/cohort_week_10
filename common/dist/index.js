"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoInput = exports.authenticationInput = void 0;
const zod_1 = require("zod");
exports.authenticationInput = zod_1.z.object({
    email: zod_1.z.string().min(10).max(50),
    password: zod_1.z.string().min(6).max(15),
});
exports.todoInput = zod_1.z.object({
    title: zod_1.z.string().min(10).max(50),
    description: zod_1.z.string().min(10).max(300),
    done: zod_1.z.boolean(),
});
