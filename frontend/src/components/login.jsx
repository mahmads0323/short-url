import {  useState } from "react";
import Button from "./reusable/button";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import postUserToLogin from "../services/postUserToLogin";

const emailRegex = new RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);



const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [, setCookie, ] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setErrors({ ...errors, email: "" });
    setLoginDetails({ ...loginDetails, email: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setErrors({ ...errors, password: "" });
    setLoginDetails({ ...loginDetails, password: e.target.value });
  };

  const handleLoginUser = async () => {
    const responseData = await postUserToLogin(loginDetails)
    if (responseData.emailError) {
      setErrors({ ...errors, email: responseData.emailError });
      return;
    }
    if (responseData.passwordError) {
      setErrors({ ...errors, password: responseData.passwordError });
      return;
    }
    setCookie("token", responseData.token, { path: "/" });
    navigate("/user");
    return;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(loginDetails.email)) {
      setErrors({ ...errors, email: "invalid email" });
      return;
    }
    await handleLoginUser();
  };

  return (
    <form
      action="#"
      onSubmit={handleFormSubmit}
      className="flex flex-col items-center justify-center py-4 space-y-4  w-[80%] md:w-[70%] lg:w-[60%] rounded-lg"
    >
      <label htmlFor="loginEmail" className="w-[90%]">
        <p>Email</p>
        <p>{location?.state?.message}</p>
        <input
          type="text"
          id="loginEmail"
          placeholder="Enter email"
          className="w-full rounded-md p-1 focus:outline-none border border-lightPurple hover:border-black"
          required
          value={loginDetails.email}
          onChange={handleEmailChange}
        />
        <p className="text-sm text-red-500 capitalize">{errors.email}</p>
      </label>
      <label htmlFor="loginPassword" className="w-[90%]">
        <p>Password</p>
        <input
          type="password"
          id="loginPassword"
          placeholder="Enter password"
          className="w-full rounded-md p-1 focus:outline-none border border-lightPurple hover:border-black"
          required
          value={loginDetails.password}
          onChange={handlePasswordChange}
        />
        <p className="text-sm text-red-500 capitalize">{errors.password}</p>
      </label>
      <Button name="login" type="submit" />
    </form>
  );
};

export default Login;
