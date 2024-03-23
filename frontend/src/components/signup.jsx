import { useState } from "react";
import Button from "./reusable/button";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import postUserToSignup from "../services/postUserToSignup";

const emailRegex = new RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/
);

const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [, setCookie, ] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setErrors({ ...errors, name: "" });
    setSignupDetails({ ...signupDetails, name: e.target.value });
  };
  const handleEmailChange = (e) => {
    setErrors({ ...errors, email: "" });
    setSignupDetails({ ...signupDetails, email: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setErrors({ ...errors, password: "" });
    setSignupDetails({ ...signupDetails, password: e.target.value });
  };

  const handleSignupUser = async () => {
    const responseData = await postUserToSignup(signupDetails);
    if (responseData.error) {
      setErrors({ ...errors, email: responseData.error });
      return;
    }
    setCookie("token", responseData.token, { path: "/" });
    navigate("/user");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (signupDetails.name.length > 30) {
      setErrors({ ...errors, name: "name too long" });
      return;
    }
    if (!emailRegex.test(signupDetails.email)) {
      setErrors({ ...errors, email: "invalid email" });
      return;
    }
    if (signupDetails.password.length < 8) {
      setErrors({ ...errors, password: "must be at least 8 characters" });
      return;
    }
    if (!passwordRegex.test(signupDetails.password)) {
      setErrors({
        ...errors,
        password: "must contain uppercase, lowercase, number, symbol",
      });
      return;
    }
    handleSignupUser();
  };

  return (
    <form
      action="#"
      onSubmit={handleFormSubmit}
      className="flex flex-col items-center justify-center py-4 space-y-4  w-[80%] md:w-[70%] lg:w-[60%] rounded-lg"
    >
      <label htmlFor="signupName" className="w-[90%]">
        <p>Name</p>
        <input
          type="text"
          id="signupName"
          placeholder="Enter name"
          className="w-full rounded-md p-1 focus:outline-none border border-lightPurple hover:border-black"
          required
          value={signupDetails.name}
          onChange={handleNameChange}
        />
        <p className="text-sm text-red-500">{errors.name}</p>
      </label>
      <label htmlFor="loginEmail" className="w-[90%]">
        <p>Email</p>
        <input
          type="text"
          id="loginEmail"
          placeholder="Enter email"
          className="w-full rounded-md p-1 focus:outline-none border border-lightPurple hover:border-black"
          required
          value={signupDetails.email}
          onChange={handleEmailChange}
        />
        <p className="text-sm text-red-500">{errors.email}</p>
      </label>
      <label htmlFor="loginPassword" className="w-[90%]">
        <p>Password</p>
        <input
          type="password"
          id="loginPassword"
          placeholder="Enter password"
          className="w-full rounded-md p-1 focus:outline-none border border-lightPurple hover:border-black"
          required
          value={signupDetails.password}
          onChange={handlePasswordChange}
        />
        <p className="text-sm text-red-500">{errors.password}</p>
      </label>
      <Button name="signup" type="submit" />
    </form>
  );
};

export default Signup;
