const { verifyToken } = require("../utils/authentication");

const checkAuthentication = (cookieName) => {
  return (req, res, next) => {
    const cookieValue = req.cookies[cookieName];
    if (!cookieValue) {
      return res.json({ error: "user not logged in" });
    }
    const payload = verifyToken(cookieValue);
    if (!payload) {
      return res.json({ error: "user token error" });
    }
    req.currentUser = payload;
    next();
  };
};

module.exports = checkAuthentication;
