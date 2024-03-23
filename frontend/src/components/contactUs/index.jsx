import Footer from "../footer";
import ContactUs from "../reusable/contactUs";

const Contact = () => {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-between pt-10">
        <ContactUs />
        <Footer />
      </div>
    </>
  );
};

export default Contact;
