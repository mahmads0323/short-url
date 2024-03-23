
const REGISTER_UER_API_URL = import.meta.env.VITE_POST_SIGNUP_USER || "http://localhost:8000/user/register";
const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

const postUserToSignup = async(signupDetails)=>{
    const response = await fetch(REGISTER_UER_API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(signupDetails),
        credentials: "include",
      });
      const responseData = await response.json();
      return responseData;
}

export default postUserToSignup;