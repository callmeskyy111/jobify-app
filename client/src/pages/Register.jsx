import React from "react";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import RegisterWrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export async function registerAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration Successful ✌🏻");
    return redirect("/login");
  } catch (err) {
    console.log("🔴ERROR:", err);
    toast.error(err?.response?.data?.msg);
    return err;
  }
}

function Register() {
  const navigation = useNavigation();
  //console.log(navigation);
  const isSubmitting = navigation.state === "submitting";
  return (
    <RegisterWrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          labelTxt="First Name"
          defaultValue="Soumadip"
          placeholderTxt="Enter your first name"
        />
        <FormRow
          type="text"
          name="lastName"
          labelTxt="Last Name"
          defaultValue="Banerjee"
          placeholderTxt="Enter your last name"
        />
        <FormRow
          type="text"
          name="location"
          labelTxt="Location"
          defaultValue="CCU"
          placeholderTxt="Enter your location"
        />
        <FormRow
          type="email"
          name="email"
          labelTxt="Email"
          defaultValue="soumadip@example.com"
          placeholderTxt="Enter your email"
        />
        <FormRow
          type="password"
          name="password"
          labelTxt="Password"
          defaultValue="soumadip12345"
          placeholderTxt="Enter your password"
        />

        <button disabled={isSubmitting} type="submit" className="btn btn-block">
          {isSubmitting ? "Submitting... ⌛" : "Submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </RegisterWrapper>
  );
}

export default Register;
