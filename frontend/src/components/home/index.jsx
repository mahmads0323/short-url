import Footer from "../footer";
import ContactUs from "../reusable/contactUs";
import FAQSection from "./faqSection";
import Features from "./features";
import HeroSection from "./hero";
import UserReviews from "./userReviews";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <UserReviews />
      <FAQSection />
      <ContactUs />
      <Footer />
    </>
  );
};

export default HomePage;
