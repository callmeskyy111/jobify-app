import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import Job from "../models/job.model.js";
import mongoose from "mongoose";

//! reusable code, doesn't change
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, _, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

//todo: 1 for every controller ☑️

//! JOB-input
export const validateJobInput = withValidationErrors([
  //for strings
  body("company").notEmpty().withMessage("company-name is required!🔴"),
  body("position").notEmpty().withMessage("job-position is required! 🔴"),
  body("jobLocation").notEmpty().withMessage("job-location is required!🔴"),
  //for enums:
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid job-status value! 🔴"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid job-type value! 🔴"),
]);

//! ID-Syntax
export const validateIdParams = withValidationErrors([
  param("id").custom(async (val) => {
    const isValidId = mongoose.Types.ObjectId.isValid(val);
    if (!isValidId) {
      throw new Error(`🔴 Invalid MongoDb ID: ${val}`);
    }
    const singleJob = await Job.findById(val);
    if (!singleJob) throw new Error(`no job with id: ${val}, found`);
  }),
]);
