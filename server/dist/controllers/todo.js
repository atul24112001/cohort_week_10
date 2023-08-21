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
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getAllTodo = void 0;
const db_error_1 = __importDefault(require("../utils/db-error"));
const functions_1 = require("../utils/functions");
const cohort_todo_common_1 = require("@atul24112001/cohort_todo_common");
function getAllTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentUser = req.currentUser;
            const prisma = (0, functions_1.getPrisma)();
            const todoList = yield prisma.todo.findMany({
                where: {
                    userId: currentUser.id || 0,
                },
            });
            (0, functions_1.sendResponse)(res, todoList);
        }
        catch (error) {
            (0, db_error_1.default)(res, error);
        }
    });
}
exports.getAllTodo = getAllTodo;
function addTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentUser = req.currentUser;
            const prisma = (0, functions_1.getPrisma)();
            const parsedBody = cohort_todo_common_1.todoInput.safeParse(req.body);
            if (!parsedBody.success) {
                (0, db_error_1.default)(res, "Invalid input");
                return;
            }
            const todo = yield prisma.todo.create({
                data: {
                    title: parsedBody.data.title,
                    description: parsedBody.data.description,
                    done: parsedBody.data.done,
                    userId: currentUser.id,
                },
            });
            (0, functions_1.sendResponse)(res, [todo]);
        }
        catch (error) {
            (0, db_error_1.default)(res, error);
        }
    });
}
exports.addTodo = addTodo;
function updateTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentUser = req.currentUser;
            const id = req.params.id;
            const prisma = (0, functions_1.getPrisma)();
            const parsedBody = cohort_todo_common_1.todoInput.safeParse(req.body);
            if (!parsedBody.success) {
                (0, db_error_1.default)(res, "Invalid input");
                return;
            }
            const updatedTodo = yield prisma.todo.update({
                where: {
                    id: parseInt(id),
                    userId: currentUser.id,
                },
                data: {
                    description: parsedBody.data.description,
                    title: parsedBody.data.title,
                    done: parsedBody.data.done,
                },
            });
            (0, functions_1.sendResponse)(res, [updatedTodo]);
        }
        catch (error) {
            (0, db_error_1.default)(res, error);
        }
    });
}
exports.updateTodo = updateTodo;
function deleteTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentUser = req.currentUser;
            const prisma = (0, functions_1.getPrisma)();
            const id = req.params.id;
            const deletedTodo = yield prisma.todo.delete({
                where: {
                    id: parseInt(id),
                    userId: currentUser.id,
                },
            });
            (0, functions_1.sendResponse)(res, [deletedTodo]);
        }
        catch (error) {
            (0, db_error_1.default)(res, error);
        }
    });
}
exports.deleteTodo = deleteTodo;
