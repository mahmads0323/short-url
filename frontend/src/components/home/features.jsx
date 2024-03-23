import AllFeatures from "./allFeatures";
import FeatureCard from "../reusable/featureCard";

const Features = () => {
  return (
    <section>
      <div className="flex flex-col items-center pt-8 space-y-4">
        <h2 className="text-purple font-semibold">Flexible features</h2>
        <h3 className="w-[90%] text-center text-2xl">
          Everything you need for auience analysis and understanding
        </h3>
        <h2 className="text-sm text-center opacity-85 w-[90%]">
          Get a full & powerfull solution to generate, share and track links for
          every communication
        </h2>
      </div>

      <div className="flex flex-wrap justify-around py-10 px-20">
        {AllFeatures.map((features, index) => (
          <FeatureCard {...features} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Features;
