
const USER_VALIDATION_API_URL = import.meta.env.VITE_USER_VALIDATION || "http://localhost:8000/user";

const validateUser = async()=>{
    const response = await fetch(USER_VALIDATION_API_URL, {
        method: "POST",
        credentials: "include",
      });
      const responseData = await response.json();
      return responseData;
}

export default validateUser