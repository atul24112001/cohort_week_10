import { Request, Response } from "express";
import dbError from "../utils/db-error";
import {
  AuthenticationParams,
  authenticationInput,
} from "@atul24112001/cohort_todo_common";
import {
  genToken,
  getPrisma,
  hashString,
  sendResponse,
  verifyHash,
} from "../utils/functions";

export async function signup(req: Request, res: Response) {
  try {
    const parsedBody = authenticationInput.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(411).json({
        message: parsedBody.error.message,
      });
      return;
    }
    const prisma = getPrisma();
    const userExist = await prisma.user.findFirst({
      where: {
        email: parsedBody.data.email,
      },
    });
    if (userExist) {
      dbError(res, "User already exist, please login");
      return;
    }
    const hashedPassword = await hashString(parsedBody.data.password);
    const newUser = await prisma.user.create({
      data: {
        email: parsedBody.data.email,
        password: hashedPassword,
      },
    });
    const payload = JSON.parse(JSON.stringify(newUser));
    delete payload["password"];
    delete payload["token"];
    const token = genToken(payload);

    await prisma.user.update({
      where: {
        id: newUser.id,
      },
      data: {
        token,
      },
    });
    sendResponse(res, [payload], "Signup Successfully!", 201, null, token);
    return;
  } catch (error) {
    dbError(res, error);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const parsedBody = authenticationInput.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(411).json({
        message: parsedBody.error.message,
      });
      return;
    }
    const prisma = getPrisma();
    const userExist = await prisma.user.findFirst({
      where: {
        email: parsedBody.data.email,
      },
    });
    if (!userExist) {
      dbError(res, "User doesn't exist, please signup");
      return;
    }

    const validPassword = await verifyHash(
      parsedBody.data.password,
      userExist.password
    );
    if (!validPassword) {
      dbError(res, "Incorrect Password");
      return;
    }
    const payload = JSON.parse(JSON.stringify(userExist));
    delete payload["password"];
    delete payload["token"];
    const token = genToken(payload);

    await prisma.user.update({
      where: {
        id: userExist.id,
      },
      data: {
        token,
      },
    });
    sendResponse(res, [payload], "Login Successfully!", 200, null, token);
    return;
  } catch (error) {
    dbError(res, error);
  }
}

export async function verifyUserToken(req: Request, res: Response) {
  try {
    console.log(req.currentUser);
    res.status(200).json({
      message: "Login successfully!",
    });
    return;
  } catch (error) {
    dbError(res, error);
  }
}
