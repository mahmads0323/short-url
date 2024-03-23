import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../reusable/button";
import getOriginalUrl from "../../services/getOriginalUrl";


const Redirect = () => {
  const params = useParams();
  const navigator = useNavigate();
  const [message, setMessage] = useState("Loading...");
  const [password, setPassword] = useState("");
  const [passwordRequired, setPasswordRequired] = useState(false);
  const makeFetchRequest = async () => {
    try {
      const responseData = await getOriginalUrl(params.shortUrl, password)
      if (responseData.error) {
        if (responseData.error == "password required") {
          setPasswordRequired(true);
        }
        setMessage(responseData.error);
        return;
      }
      let targetUrl = "https://" + responseData.targetUrl;
      window.location.replace(targetUrl);
    } catch (error) {
      setMessage("URL not found! 2");
      console.log(error);
    }
  };

  const handlePasswordChange = (e) => {
    setMessage("");
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Loading...");
    makeFetchRequest();
  };
  useEffect(() => {
    makeFetchRequest();
  }, );

  if (params.shortUrl.length !== 8) {
    navigator("*", { replace: true });
  }
  return (
    <div className="w-full flex flex-col justify-center h-[70vh] items-center">
      <div>
        <p className="text-red-500 capitalize">{message}</p>
      </div>
      {passwordRequired && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            <p>Password</p>
            <div className="flex flex-col items-center space-y-2">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
                className="focus:outline-none h-8 w-[65vw] sm:w-[50vw] md:w-[45vw] lg:w-[30vw]  bg-white shadow-lg px-4 rounded-xl mt-1 border border-lightPurple hover:border-black"
              />
              <Button name="Go =>" type="submit" />
            </div>
          </label>
        </form>
      )}
    </div>
  );
};

export default Redirect;
