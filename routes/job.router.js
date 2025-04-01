import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
} from "../controllers/job.controller.js";
import {
  validateIdParams,
  validateJobInput,
} from "../middlewares/validation.middleware.js";
const jobRouter = Router();

jobRouter.get("/", getAllJobs);
jobRouter.get("/:id", validateIdParams, getSingleJob);
jobRouter.post("/", validateJobInput, createJob);
jobRouter.patch("/:id", validateIdParams, validateJobInput, updateJob);
jobRouter.delete("/:id", validateIdParams, deleteJob);

export default jobRouter;
