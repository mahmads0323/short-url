const ALL_URL_STATS_API =
  import.meta.env.VITE_ALL_URL_STATS || "http://localhost:8000/urlstats";

const getAllUrlStats = async (monthCount) => {
  const headers = {
    x_months: monthCount,
  };
  const response = await fetch(ALL_URL_STATS_API, {
    method: "GET",
    headers: headers,
  });
  const responseData = await response.json();
  return responseData;
};

export default getAllUrlStats;
