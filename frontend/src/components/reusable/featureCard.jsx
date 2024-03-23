const FeatureCard = (props) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 py-8 px-4 md:py-14 w-[90%] md:w-[50%] shadow-md rounded-lg">
      <div className="rounded-full p-5 h-20 w-20 bg-lightGreyishOrange">
        <img src={props.icon} alt={props.shortTitle} />
      </div>
      <h4 className="font-semibold">{props.title}</h4>
      <h5 className="text-center w-[90%] lg:w-[75%]">{props.description}</h5>
      <h2 className="font-light">{props.shortTitle}</h2>
    </div>
  );
};

export default FeatureCard;
