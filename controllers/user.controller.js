import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Job from "../models/job.model.js";

//fetching CURRENT LOGGED_IN-USER
export async function getCurrentUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "ERROR FETCHING CURRENT-USER! 🔴" });
    }
    const userWithOutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Fetched the CURRENT-USER ✅",
      currentUser: userWithOutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}

// Stats. about the application, if user is 'admin'
export async function getApplicationStats(req, res) {
  try {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res
      .status(StatusCodes.OK)
      .json({
        success: true,
        message: "Fetched Application-Stats. ✅",
        jobs,
        users,
      });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}

// Updating the CURRENTLY LOGGED-IN USER
export async function updateUser(req, res) {
  try {
    const obj = { ...req.body };
    delete obj.password; //just to be sure - EXTRA SAFETY 🛡️
    console.log(obj);
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
    if (!updatedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "COULD NOT FIND USER! 🔴" });
    }
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "User updated ✅" });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}
