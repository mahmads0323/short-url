const Button = (props) => {
  const handleClick = () => {
    // console.log("ok");
  };
  return (
    <button
      className="text-white bg-purple px-2 py-1 sm:px-3 md:py-2 text-sm cursor-pointer active:scale-[1.05]  rounded-md"
      onClick={handleClick}
      type={props.type}
    >
      {props.name}
    </button>
  );
};

export default Button;
