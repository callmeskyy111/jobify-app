import React from "react";
import { Link } from "react-router-dom";
import RegisterWrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import { FormRow } from "../components";

function Register() {
  return (
    <RegisterWrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          labelTxt="First Name👤"
          defaultValue="John"
          placeholderTxt="Enter your first name"
        />
        <FormRow
          type="text"
          name="location"
          labelTxt="Last Name📛"
          defaultValue="Doe"
          placeholderTxt="Enter your last name"
        />
        <FormRow
          type="text"
          name="location"
          labelTxt="Location📍"
          defaultValue="Berlin"
          placeholderTxt="Enter your location"
        />
        <FormRow
          type="email"
          name="email"
          labelTxt="Email📧"
          defaultValue="john@example.com"
          placeholderTxt="Enter your email"
        />
        <FormRow
          type="password"
          name="password"
          labelTxt="Password🔑"
          defaultValue="password123"
          placeholderTxt="Enter your password"
        />

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </RegisterWrapper>
  );
}

export default Register;
