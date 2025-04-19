import { Link, Form, redirect, useNavigation } from "react-router-dom";
import LoginWrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success(`Logged In!`);
    return redirect("/dashboard");
  } catch (err) {
    console.log("🔴ERROR:", err);
    toast.error(`${err?.response?.statusText}, ${err?.message}`);
    return err;
  }
};

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <LoginWrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login🔐</h4>
        <FormRow
          type="email"
          name="email"
          placeholderTxt="Enter your email"
          labelTxt="Email"
          defaultValue="soumadip@example.com"
        />
        <FormRow
          type="password"
          name="password"
          placeholderTxt="Enter your password"
          labelTxt="Password"
          defaultValue="soumadip12345"
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting... ⌛" : "Submit"}
        </button>
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </LoginWrapper>
  );
}

export default Login;
