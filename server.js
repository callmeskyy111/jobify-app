import express from "express";
import morgan from "morgan";
import "dotenv/config";
import connectDb from "./utils/connectDb.js";
import jobRouter from "./routes/job.router.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import authRouter from "./routes/auth.router.js";
import { authenticateUser } from "./middlewares/auth.middleware.js";
import userRouter from "./routes/user.router.js";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";


const app = express();

app.use(cookieParser());
app.use(express.json());
connectDb();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//public
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));
const PORT = process.env.PORT || 5100;

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "<h2>Hello from SERVER ✅</h2>",
  });
});

//routers
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);


//Not found route 4️⃣0️⃣4️⃣
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Not found 🌵" });
});

//Error route - must be at the end;
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🛜`);
});
