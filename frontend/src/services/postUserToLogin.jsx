const LOGIN_API_URL = import.meta.env.VITE_POST_LOGIN_USER || "http://localhost:8000/user/login";
const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

const postUserToLogin = async(loginDetails)=>{
    const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(loginDetails),
        credentials: "include",
      });
      const responseData = await response.json();
      return responseData;
}

export default postUserToLogin;