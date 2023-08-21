import Express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import cookieParse from "cookie-parser";

import RouteNotFound from "./utils/route-not-fount";
import authRouter from "./routes/authentication.routes";
import todoRouter from "./routes/todo.routes";

config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});

const PORT = process.env.PORT;
const app = Express();
app.use(Express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParse());
app.use(morgan("dev"));

app.use("/api/todo_app/authentication", authRouter);
app.use("/api/todo_app/todo", todoRouter);

app.use(
  Express.static(
    process.env.NODE_ENV == "production" ? "dist" : "src" + "/public"
  )
);
app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
