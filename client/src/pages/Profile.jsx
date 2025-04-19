import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { useNavigation, Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

function Profile() {
  const { currentUser } = useOutletContext();
  const { name, lastName, email, location } = currentUser;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          {/* file input 📂 */}
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 mb)
            </label>
            <input
              type="file"
              id="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            defaultValue={lastName}
            labelTxt="last name"
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
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

export default Profile;
