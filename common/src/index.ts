import { z } from "zod";

export const authenticationInput = z.object({
  email: z.string().min(10).max(50),
  password: z.string().min(6).max(15),
});

export type AuthenticationParams = z.infer<typeof authenticationInput>;

export const todoInput = z.object({
  title: z.string().min(10).max(50),
  description: z.string().min(10).max(300),
  done: z.boolean(),
});

export type TodoInput = z.infer<typeof todoInput>;
