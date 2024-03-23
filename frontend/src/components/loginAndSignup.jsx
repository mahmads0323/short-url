import { useState, useEffect } from "react";
import Login from "./login";
import Signup from "./signup";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LoginAndSignup = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [cookie, , ] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  useEffect(() => {
    if (cookie.token) {
      navigate("/");
    }
  }, );

  return (
    <section className="flex flex-col w-full h-screen items-center justify-center space-y-4 overflow-x-hidden">
      <p className="text-purple font-bold text-lg">
        {isLoginForm ? "Login" : "Signup"}
      </p>
      <div className="w-[80%] md:w-[70%] lg:w-[60%] rounded-lg py-4 flex flex-col items-center justify-center bg-lightGreyishOrange">
        {isLoginForm ? <Login /> : <Signup />}
        <p className="text-sm opacity-85 text-center">
          {isLoginForm
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            className="text-purple cursor-pointer"
            onClick={handleToggleForm}
          >
            {isLoginForm ? "signup" : "login"}
          </span>
        </p>
      </div>
    </section>
  );
};

export default LoginAndSignup;
