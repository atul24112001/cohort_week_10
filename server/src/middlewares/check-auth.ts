import { NextFunction, Request, Response } from "express";
import dbError from "../utils/db-error";
import { getPrisma, verifyToken } from "../utils/functions";
import { User } from "../types";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.header("authorization");
    const token = authorization?.split(" ")[1];
    const prisma = getPrisma();

    if (!token) {
      dbError(res, "Token is not provided.", 400);
      return;
    }

    const payload = verifyToken(token) as User;
    if (!payload) {
      dbError(res, "Token is not Valid.", 400);
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      dbError(res, "User not found!", 404);
      return;
    }

    if (user.token !== token) {
      dbError(res, "Unauthorized token!", 401);
      return;
    }
    req.currentUser = payload;
    next();
    return;
  } catch (error) {
    dbError(res, error);
  }
}
