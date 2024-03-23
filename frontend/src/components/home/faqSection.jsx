import FaqCard from "../reusable/faqCard";
import questions from "./allQuestions";

const FAQSection = () => {
  return (
    <section className="flex flex-col w-full space-y-4 py-8">
      <div className="flex flex-col items-center">
        <h5 className="text-purple font-semibold">FAQ&apos;s</h5>
        <h4 className="text-2xl font-semibold md:text-3xl">Have a question?</h4>
      </div>
      <div className="flex flex-col items-center space-y-4">
        {questions.map((item, index) => (
          <FaqCard {...item} key={index} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
