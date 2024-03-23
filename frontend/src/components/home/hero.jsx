import LineChart from "./lineChart";
import UrlInputForm from "../reusable/urlInputForm";

const HeroSection = () => {
  return (
    <section className="bg-lightGreyishOrange px-4 flex flex-col items-center text-black py-4">
      <div className="flex flex-col space-y-1 justify-center py-16 md:pt-24 md:pb-0">
        <p className="font-semibold opacity-85 text-purple text-2xl md:text-3xl">
          Create URL! <span className="font-light">short</span>
        </p>
        <div>
          <UrlInputForm />
        </div>
      </div>

      <div className="mt-8 md:flex md:items-center md:mt-4">
        <div className="flex flex-col items-center space-y-4 ">
          <h3 className="w-full text-center text-xl md:text-2xl md:w-[60%]">
            Effortlessly Control Domains and Track Insights
          </h3>
        </div>
        <div className="mt-4 md:flex-[50%] md:p-4 lg:p-20 ">
          <LineChart />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
