import { useNavigate } from "react-router-dom";
import StatisticsChart from "./statistics";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import UrlInputForm from "../reusable/urlInputForm";
import AllUrls from "./allUrls";
import Footer from "../footer";

const UserPage = () => {
  const [cookie, ,] = useCookies(["token"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookie.token) {
      navigate("/");
    }
  },);
  return (
    <>
      <div className="flex flex-col bg-lightGreyishOrange space-y-1 justify-center items-center py-16 md:pt-24">
        <p className="font-semibold opacity-85 text-purple text-2xl md:text-3xl">
          Create URL! <span className="font-light">short</span>
        </p>
        <div className="">
          <UrlInputForm />
        </div>
      </div>
      <StatisticsChart />
      <AllUrls />
      <Footer />
    </>
  );
};

export default UserPage;
