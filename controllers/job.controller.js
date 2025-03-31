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
export async function getAllJobs(req, res) {
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
    const { id } = req.params;
    const singleJob = await Job.findById(id);

    if (!singleJob) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `No job found with id: '${id}' ❌`,
      });
    }

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
    const { id } = req.params;

    const updatedJob = await Job.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `No job found with id: '${id}' ❌`,
      });
    }

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
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `No job found with id: '${id}' ❌`,
      });
    }

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
