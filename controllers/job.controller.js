import Job from "../models/job.model.js";
import { StatusCodes } from "http-status-codes";

// Create a new job
export async function createJob(req, res) {
  try {
    const { company, position } = req.body;
    const newJob = await Job.create({ company, position });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "New job created ✅",
      createdJob: newJob,
    });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: err.message });
  }
}

// Get all jobs
export async function getAllJobs(_, res) {
  try {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Fetched all jobs ✅",
      totalJobs: jobs.length,
      jobList: jobs,
    });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: err.message });
  }
}

// Get a single job by ID
export async function getSingleJob(req, res) {
  try {
    const singleJob = await Job.findById(req.params.id);
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Fetched job details ✅", singleJob });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: err.message });
  }
}

// Update a job
export async function updateJob(req, res) {
  try {
    const updatedJob = await Job.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Job updated successfully ✅",
      updatedJob,
    });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: err.message });
  }
}

// Delete a job
export async function deleteJob(req, res) {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Job deleted successfully ✅",
      removedJob: deletedJob,
    });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: err.message });
  }
}
