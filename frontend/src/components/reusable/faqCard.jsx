const FaqCard = (props) => {
  return (
    <details className="w-[80%] md:w-[70%] lg:w-[60%] bg-lightGreyishOrange px-4 py-2 rounded-lg shadow-md cursor-pointer">
      <summary className="text-lg font-semibold">{props.question}</summary>
      <p className="opacity-85">{props.answer}</p>
    </details>
  );
};

export default FaqCard;
