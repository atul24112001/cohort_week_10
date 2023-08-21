import { Router } from "express";
import { login, signup, verifyUserToken } from "../controllers/authentication";
import { checkAuth } from "../middlewares/check-auth";
const authRouter = Router();

authRouter.post("/sign-up", signup);
authRouter.get("/verify-token", checkAuth, verifyUserToken);
authRouter.post("/login", login);

export default authRouter;
