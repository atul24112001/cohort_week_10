import { Request, Response } from "express";
import dbError from "../utils/db-error";
import { getPrisma, sendResponse } from "../utils/functions";
import { TodoInput, todoInput } from "@atul24112001/cohort_todo_common";

export async function getAllTodo(req: Request, res: Response) {
  try {
    const currentUser = req.currentUser;
    const prisma = getPrisma();

    const todoList = await prisma.todo.findMany({
      where: {
        userId: currentUser.id || 0,
      },
    });

    sendResponse(res, todoList);
  } catch (error) {
    dbError(res, error);
  }
}

export async function addTodo(req: Request, res: Response) {
  try {
    const currentUser = req.currentUser;
    const prisma = getPrisma();
    const parsedBody = todoInput.safeParse(req.body);
    if (!parsedBody.success) {
      dbError(res, "Invalid input");
      return;
    }

    const todo = await prisma.todo.create({
      data: {
        title: parsedBody.data.title,
        description: parsedBody.data.description,
        done: parsedBody.data.done,
        userId: currentUser.id,
      },
    });

    sendResponse(res, [todo]);
  } catch (error) {
    dbError(res, error);
  }
}

export async function updateTodo(req: Request, res: Response) {
  try {
    const currentUser = req.currentUser;
    const id = req.params.id;
    const prisma = getPrisma();
    const parsedBody = todoInput.safeParse(req.body);
    if (!parsedBody.success) {
      dbError(res, "Invalid input");
      return;
    }

    const updatedTodo = await prisma.todo.update({
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

    sendResponse(res, [updatedTodo]);
  } catch (error) {
    dbError(res, error);
  }
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    const currentUser = req.currentUser;
    const prisma = getPrisma();
    const id = req.params.id;

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: parseInt(id),
        userId: currentUser.id,
      },
    });

    sendResponse(res, [deletedTodo]);
  } catch (error) {
    dbError(res, error);
  }
}
