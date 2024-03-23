import { useState } from "react";
import GoIcon from "/greater-than-solid.png";
import CopyIcon from "/copy-regular.png";
import { useCookies } from "react-cookie";
import postShortUrl from "../../services/postShortUrl";

const urlRegex = new RegExp(
  /^(?:https?:\/\/)?(?!(?:10|127)(?:\.\d{1,3}){3})(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-_]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(?::\d+)?(?:\/\S*)?$/
);

const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || "http://localhost:5173/";

const UrlInputForm = () => {
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [credentialsErrorMessage, setCredentialsErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoginErrorMessage, setIsLoginErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [cookie, , ] = useCookies(["token"]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setCredentialsErrorMessage("");
    setIsError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordErrorMessage("");
  };

  const handleCopyUrl = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(shortUrl);
      setUrl("");
      setShortUrl("");
      setPassword("");
      setCredentialsErrorMessage("copied!");
      setTimeout(() => {
        setCredentialsErrorMessage("");
      }, 1000);
    } catch (e) {
      console.log("Error in copying shorturl", e);
    }
  };

  const makePostRequest = async () => {
    let urlToSubmit = url;
    if (urlToSubmit.includes("https://")) {
      urlToSubmit = urlToSubmit.replace("https://", "");
    }
    if (urlToSubmit.includes("www.")) {
      urlToSubmit = urlToSubmit.replace("www.", "");
    }
    const responseData = await postShortUrl(urlToSubmit, password, isAdvanced);
    if (responseData.error) {
      setIsLoginErrorMessage(true);
      return;
    }
    const newShortUrl = `${CLIENT_URL}${responseData.shortUrl}`;
    setShortUrl(newShortUrl);
    setUrl(newShortUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!urlRegex.test(url)) {
      setIsError(true);
      setCredentialsErrorMessage("Invalid url");
      return;
    }
    if (isAdvanced && password.length < 8) {
      setPasswordErrorMessage("password must be at least 8 chracters");
      return;
    }
    if (!cookie.token) {
      setIsLoginErrorMessage(true);
      return;
    }
    makePostRequest();
  };

  return (
    <div className="flex flex-col">
      {isLoginErrorMessage && (
        <p className="text-red-500">
          Pleae{" "}
          <a href="/user/get-started" className="underline">
            login
          </a>{" "}
          to continue
        </p>
      )}
      <form
        onSubmit={shortUrl !== "" ? handleCopyUrl : handleSubmit}
        className="flex flex-col"
      >
        <div>
          <div className="flex justify-between items-center h-8 bg-white shadow-lg  w-[65vw] sm:w-[50vw] md:w-[45vw] lg:w-[30vw] px-4 rounded-xl border border-lightPurple hover:border-black">
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              readOnly={shortUrl != ""}
              onChange={handleUrlChange}
              className="focus:border-none focus:outline-none w-[80%] text-nowrap"
            />
            <button type="submit">
              <img
                src={shortUrl !== "" ? CopyIcon : GoIcon}
                alt="ok"
                className="h-4 w-4"
              />
            </button>
          </div>
          <p className={`pl-2 ${isError ? "text-red-600" : "text-green-600"}`}>
            {credentialsErrorMessage}
          </p>
        </div>

        {isAdvanced && (
          <div>
            <input
              type="password"
              value={password}
              readOnly={shortUrl != ""}
              onChange={handlePasswordChange}
              placeholder="Set password"
              className="focus:outline-none h-8 w-[65vw] sm:w-[50vw] md:w-[45vw] lg:w-[30vw]  bg-white shadow-lg px-4 rounded-xl mt-1 border border-lightPurple hover:border-black"
            />
            <p className="pl-2 text-red-500">{passwordErrorMessage}</p>
          </div>
        )}
      </form>

      <div>
        <label
          htmlFor="advanced_options"
          className="flex items-center space-x-1 my-1"
        >
          <input
            type="checkbox"
            id="advanced_options"
            checked={isAdvanced}
            onChange={() => setIsAdvanced(!isAdvanced)}
          />
          <span className="text-sm">Advanced options</span>
        </label>
      </div>
    </div>
  );
};

export default UrlInputForm;
