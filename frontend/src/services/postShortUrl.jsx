const headers = {
  "Content-Type": "application/json; charset=utf-8",
};
const POST_URL_API =
  import.meta.env.VITE_POST_SHORT_URL || "http://localhost:8000/url";

const postShortUrl = async (urlToSubmit, password, isAdvanced) => {
    const dataToSend = JSON.stringify({
        targetUrl: urlToSubmit,
        password: isAdvanced ? password : null,
      });
  const response = await fetch(POST_URL_API, {
    method: "POST",
    headers: headers,
    body: dataToSend,
    credentials: "include",
  });
  const responseData = await response.json();
  return responseData;
};

export default postShortUrl;
