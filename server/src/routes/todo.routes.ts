import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  getAllTodo,
} from "../controllers/todo";
import { checkAuth } from "../middlewares/check-auth";
const todoRouter = Router();

todoRouter.get("/", checkAuth, getAllTodo);
todoRouter.post("/", checkAuth, addTodo);
todoRouter.put("/:id", checkAuth, updateTodo);
todoRouter.delete("/:id", checkAuth, deleteTodo);

export default todoRouter;
