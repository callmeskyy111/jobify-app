import Job from "../models/job.model.js";
import { StatusCodes } from "http-status-codes";

// Create Job
export async function createJob(req, res) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! No token provided 🔒",
      });
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "New job created ✅",
      createdJob: job,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Failed to create job ❌",
    });
  }
}

// Get All Jobs
export async function getAllJobs(req, res) {
  try {
    if (!req.user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! No token provided 🔒",
      });
    }

    const jobs = await Job.find({ createdBy: req.user.userId });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Fetched all jobs ✅",
      totalJobs: jobs.length,
      jobList: jobs,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}

// Get Single Job
export async function getSingleJob(req, res) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! No token provided 🔒",
      });
    }
    const singleJob = await Job.findById(req.params.id);

    if (!singleJob) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Job not found ❌",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Fetched job details ✅",
      singleJob,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}

// Update Job
export async function updateJob(req, res) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! No token provided 🔒",
      });
    }
    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Job not found ❌",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Job updated successfully ✅",
      updatedJob,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}

// Delete Job
export async function deleteJob(req, res) {
  try {
    if (!req.user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! No token provided 🔒",
      });
    }
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Job not found ❌",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Job deleted successfully ✅",
      removedJob: deletedJob,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}
