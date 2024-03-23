const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

const SHORT_URL_API =
  import.meta.env.VITE_SHORT_URL || "http://localhost:8000/url/";

const getOriginalUrl = async (shortUrl, password) => {
  const dataToSend = {
    targetUrl: shortUrl,
    password: password === "" ? undefined : password,
  };
  const response = await fetch(`${SHORT_URL_API}${shortUrl}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(dataToSend),
  });
  const responseData = await response.json();
  return responseData;
};

export default getOriginalUrl;
