import { Link, NavLink } from "react-router-dom";
import NavbarLogo from "/navbar-logo.png";
import LoginLogoutButton from "./loginLogoutButton";

const Navbar = () => {
  return (
    <div className="bg-white shadow-lg flex p-2 items-center sm:p-4 md:px-10 lg:pr-40 lg:pl-20 mb-1">
      <div className="flex items-center flex-[40%] justify-center space-x-2 sm:space-x-4 md:space-x-6 md:flex-[30%] lg:flex-[25%]">
        <Link className="flex items-center cursor-pointer" to="/">
          <div className="h-[25px] w-[25px]">
            <img src={NavbarLogo} alt="logo" />
          </div>
          <p className="font-bold opacity-90 text-nowrap">short URL</p>
        </Link>

        <div>
          <ul className="flex space-x-2 md:space-x-3">
            <li>
              <NavLink
                to="contact"
                className="hover:text-purple active:text-purple"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-[20%] md:flex-[40%] lg:flex-[50%]"></div>
      <div className="flex-[40%] flex justify-center md:flex-[30%] lg:flex-[25%] lg:justify-end">
        <LoginLogoutButton />
      </div>
    </div>
  );
};

export default Navbar;
