const GET_ALL_URLS_API =
  import.meta.env.VITE_ALL_URLS || "http://localhost:8000/url/allurls";

const userGeneratedUrls = async (skipAmount) => {
  const headers = {
    skip: skipAmount,
  };

  const response = await fetch(GET_ALL_URLS_API, {
    method: "POST",
    headers: headers,
    credentials: "include",
  });
  const responseData = await response.json();
  return responseData;
};

export default userGeneratedUrls;
