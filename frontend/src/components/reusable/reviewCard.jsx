const ReviewCard = (props) => {
  return (
    <div className="shadow-xl rounded-sm bg-white px-2 py-4 w-[80vw] md:w-[25vw] h-60 flex flex-col justify-between">
      <img src={props.rating} alt="rating-img" className="w-[30%]" />
      <h5 className=" text-sm py-2 w-full text-center">&quot;{props.review}&quot;</h5>
      <div className="flex items-center py-2 space-x-2">
        <img
          src={props.profileImg}
          alt="profileImg"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold">{props.name}</p>
          <p className="text-xs">{props.jobTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
