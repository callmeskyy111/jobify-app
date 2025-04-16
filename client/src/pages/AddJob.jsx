import React from "react";
import { FormRow, FormRowSelect } from "../components";
import { Form, redirect, useNavigation, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export async function createJobAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("Job Created Successfully");
    return redirect("/dashboard/all-jobs");
  } catch (err) {
    console.log("🔴ERROR:", err);
    toast.error(err?.response?.data?.msg);
    return err;
  }
}

function AddJob() {
  const { currentUser } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  console.log(currentUser.location);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="location"
            defaultValue={currentUser.location}
          />
          <FormRowSelect
            labelTxt="job status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelTxt="job type"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? "Submitting... ⌛" : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default AddJob;
