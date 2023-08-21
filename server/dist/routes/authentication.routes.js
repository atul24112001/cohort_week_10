"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../controllers/authentication");
const check_auth_1 = require("../middlewares/check-auth");
const authRouter = (0, express_1.Router)();
authRouter.post("/sign-up", authentication_1.signup);
authRouter.get("/verify-token", check_auth_1.checkAuth, authentication_1.verifyUserToken);
authRouter.post("/login", authentication_1.login);
exports.default = authRouter;