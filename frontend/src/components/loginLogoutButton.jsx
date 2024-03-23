import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import userLogo from "/user-regular.png";
import validateUser from "../services/validateUser";



const LoginLogoutButton = () => {
  const [cookie, , removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const findUserLoggedInorNot = async () => {
    const responseData = await validateUser();
    if (responseData.error) {
      console.log("error: ", responseData.error);
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeCookie("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    findUserLoggedInorNot();
  }, [cookie.token]);

  return (
    <>
      {isLoggedIn ? (
        <div className="flex space-x-2 items-center">
          <NavLink className="flex w-full justify-center" to="/user">
            <img src={userLogo} alt="user-regular" className="h-5 w-5 block" />
          </NavLink>
          <button
            className=" text-white bg-purple px-2 py-1 sm:px-3 md:py-2 text-sm cursor-pointer active:scale-[1.05]  rounded-md"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      ) : (
        <NavLink
          className="text-white bg-purple px-2 py-1 sm:px-3 md:py-2 text-sm cursor-pointer active:scale-[1.05]  rounded-md"
          to="/user/get-started"
        >
          login/signup
        </NavLink>
      )}
    </>
  );
};

export default LoginLogoutButton;
