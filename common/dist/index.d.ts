import { z } from "zod";
export declare const authenticationInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type AuthenticationParams = z.infer<typeof authenticationInput>;
export declare const todoInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    done: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    done: boolean;
}, {
    title: string;
    description: string;
    done: boolean;
}>;
export type TodoInput = z.infer<typeof todoInput>;
