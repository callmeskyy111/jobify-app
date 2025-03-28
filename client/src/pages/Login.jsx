import React from "react";
import { Link } from "react-router-dom";
import LoginWrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

function Login() {
  return (
    <LoginWrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="email"
          name="email"
          placeholderTxt="Enter your email"
          labelTxt="Email📧"
          defaultValue="john@example.com"
        />
        <FormRow
          type="password"
          name="password"
          placeholderTxt="Enter your password"
          labelTxt="Password🔑"
          defaultValue="password123"
        />
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </form>
    </LoginWrapper>
  );
}

export default Login;
