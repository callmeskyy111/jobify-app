import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
} from "../controllers/job.controller.js";
const jobRouter = Router();

jobRouter.get("/", getAllJobs);
jobRouter.get("/:id", getSingleJob);
jobRouter.post("/", createJob);
jobRouter.patch("/:id", updateJob);
jobRouter.delete("/:id", deleteJob);

export default jobRouter;
