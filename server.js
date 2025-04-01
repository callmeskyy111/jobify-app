import express from "express";
import morgan from "morgan";
import "dotenv/config";
import connectDb from "./connectDb.js";
import jobRouter from "./routes/job.router.js";

const app = express();

app.use(express.json());
connectDb();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5100;

app.get("/", (req, res) => {
  res.send({ success: true, message: "<h2>Hello from JOBIFY-SERVER ✅</h2>" });
});

//routers
app.use("/api/v1/jobs", jobRouter);

//middleware
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";

//Not found route 4️⃣0️⃣4️⃣
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Not found 🌵" });
});

//Error route - must be at the end;
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🛜`);
});
