const HOURLY_API_URL =
  import.meta.env.VITE_HOURLY_USER_URLS || "http://localhost:8000/stats/daily";
const WEEKLY_API_URL =
  import.meta.env.VITE_WEEKLY_USER_URLS || "http://localhost:8000/stats/weekly";
const MONTHLY_API_URL =
  import.meta.env.VITE_MONTHLY_USER_URLS ||
  "http://localhost:8000/stats/monthly";
const YEARLY_API_URL =
  import.meta.env.VITE_YEARLY_USER_URLS || "http://localhost:8000/stats/yearly";

const getUserUrlStats = async (caseValue) => {
  let api = HOURLY_API_URL;
  switch (caseValue) {
    case "1day":
      api = HOURLY_API_URL;
      break;
    case "7days":
      api = WEEKLY_API_URL;
      break;
    case "1month":
      api = MONTHLY_API_URL;
      break;
    case "1year":
      api = YEARLY_API_URL;
      break;
    default:
      api = HOURLY_API_URL;
      break;
  }
  const response = await fetch(api, {
    method: "GET",
    credentials: "include",
  });
  const responseData = await response.json();
  return responseData;
};

export default getUserUrlStats;
