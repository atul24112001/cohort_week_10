"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authentication_routes_1 = __importDefault(require("./routes/authentication.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
(0, dotenv_1.config)({
    path: path_1.default.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/api/todo_app/authentication", authentication_routes_1.default);
app.use("/api/todo_app/todo", todo_routes_1.default);
app.use(express_1.default.static("dist/public"));
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/public/index.html"));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
