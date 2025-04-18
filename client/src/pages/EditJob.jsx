import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const editPageLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect(`/dashboard/all-jobs`);
  }
};

export const editPageAction = async ({ request, params }) => {
  const formData = await request.formData();
  const jobData = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, jobData);
    toast.success("Job Edited Successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function EditJob() {
  const { singleJob } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form className="form" method="post">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={singleJob.position}
          />
          <FormRow
            type="text"
            name="company"
            defaultValue={singleJob.company}
          />
          <FormRow
            type="text"
            name="location"
            labelTxt="Job Location"
            defaultValue={singleJob.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelTxt="Job Status"
            defaultValue={singleJob.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelTxt="Job Type"
            defaultValue={singleJob.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}>
            {isSubmitting ? "Submitting... ⏳" : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default EditJob;
