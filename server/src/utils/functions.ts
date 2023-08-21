import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

let prisma: null | PrismaClient = null;

export function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

export function sendResponse(
  res: Response,
  data: any[],
  message: string | null = null,
  status: number = 200,
  total: number | null = null,
  token: null | string = null
) {
  const jsonObject: { [ket: string]: any } = {
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

export async function hashString(data: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data, salt);
  return hash;
}

export async function verifyHash(data: string, hash: string) {
  const isValid = await bcrypt.compare(data, hash);
  return isValid;
}

export function genToken(payload: any) {
  const token = jwt.sign(payload, process.env.SECRET as string, {
    expiresIn: "30d",
  });
  return token;
}

export function verifyToken(token: string) {
  const secret = process.env.SECRET as string;
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

// export const decodeToken = (token: string) => {
//   const secret = process.env.SECRET as string;
//   try {
//     const payload = jwt.verify(token, secret);
//     return payload;
//   } catch (error) {
//     return null;
//   }
// };
