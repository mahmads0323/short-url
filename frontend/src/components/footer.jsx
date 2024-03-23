const Footer = () => {
  return (
    <footer className="bg-purple text-white flex flex-col py-8 justify-center items-center w-full h-10 opacity-85 mt-auto">
      <p className="opacity-100">Copyright &copy; All rights reserved </p>
      <p className="text-sm">
        Design inspired by{" "}
        <a
          href="https://www.behance.net/gallery/179391567/Fall2in-Ultimate-URL-Shortener?tracking_source=search_projects|url+shortener&l=0"
          className="underline text-md"
          target="blank"
        >
          fall2.in
        </a>
      </p>
    </footer>
  );
};

export default Footer;
