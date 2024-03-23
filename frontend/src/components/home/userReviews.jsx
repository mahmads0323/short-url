import ReviewCard from "../reusable/reviewCard";
import AllReviews from "./allReviews";

const UserReviews = () => {
  return (
    <section className="flex flex-col items-center py-4">
      <h4 className="text-sm opacity-85">
        2,366 users have said how good short URL is.
      </h4>
      <h3 className="text-2xl font-semibold md:text-3xl md:font-bold">
        Our happy users say about us
      </h3>
      <div className="flex md:shadow-md flex-col items-center bg-gradient-to-br from-lightGreyishOrange to-lightPurple space-y-4 px-4 md:px-0 md:py-4 rounded-md m-4 mt-8  md:flex-row  md:justify-between md:items-center md:space-y-0 md:space-x-4 ">
        {AllReviews.map((review, index) => (
          <ReviewCard {...review} key={index} />
        ))}
      </div>
    </section>
  );
};

export default UserReviews;
