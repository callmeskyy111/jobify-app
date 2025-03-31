import express from "express";
import morgan from "morgan";
import "dotenv/config";
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5100;

app.get("/", (req, res) => {
  res.send({ success: true, message: "<h2>Hello from JOBIFY-SERVER ✅</h2>" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🛜`);
});
