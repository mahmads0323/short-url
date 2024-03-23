import { useState } from "react";
import Button from "./button";

const emailRegex = new RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);
const ContactUs = () => {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => {
    setErrors({ ...errors, name: "" });
    setContactDetails({ ...contactDetails, name: e.target.value });
  };
  const handleEmailChange = (e) => {
    setErrors({ ...errors, email: "" });
    setContactDetails({ ...contactDetails, email: e.target.value });
  };
  const handleMessageChange = (e) => {
    setContactDetails({ ...contactDetails, message: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(contactDetails.email)) {
      setErrors({ ...errors, email: "invalid email" });
      return;
    }
    if (contactDetails.name.length > 30) {
      setErrors({ ...errors, name: "name too long" });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setContactDetails({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };
  return (
    <section
      className="py-8 flex flex-col space-y-4 items-center"
      id="contactUs"
    >
      <div className="flex flex-col items-center">
        <h4 className="text-purple font-semibold">Contact us</h4>
        <h5 className="text-xl font-semibold md:text-2xl lg:text-3xl text-center">
          Didn&apos;t find answer you are looking for? contact us
        </h5>
      </div>
      <form
        action="#"
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center justify-center py-4 space-y-4 bg-lightGreyishOrange w-[80%] md:w-[70%] lg:w-[60%] rounded-lg"
      >
        <label htmlFor="contactName" className="w-[90%]">
          <p>Name</p>
          <input
            type="text"
            id="contactName"
            placeholder="Enter name"
            className="w-full rounded-md p-1 focus:outline-none border border-lightPurple hover:border-black"
            required
            value={contactDetails.name}
            onChange={handleNameChange}
          />
          <p className="text-sm text-red-500">{errors.name}</p>
        </label>
        <label htmlFor="contactEmail" className="w-[90%]">
          <p>Email</p>
          <input
            type="text"
            id="contactEmail"
            placeholder="Enter email"
            className="w-full rounded-md p-1 focus:outline-none border border-lightPurple hover:border-black"
            required
            value={contactDetails.email}
            onChange={handleEmailChange}
          />
          <p className="text-sm text-red-500">{errors.email}</p>
        </label>
        <div className="flex flex-col w-[90%]">
          <label htmlFor="contactText">Message</label>
          <textarea
            id="contactText"
            placeholder="Enter what you are looking for?"
            className="w-full rounded-md p-1 focus:outline-none border border-lightPurple hover:border-black"
            required
            value={contactDetails.message}
            onChange={handleMessageChange}
          />
        </div>
        <Button name={isSubmitting ? "submitting" : "submit"} type="submit" />
      </form>
    </section>
  );
};

export default ContactUs;
