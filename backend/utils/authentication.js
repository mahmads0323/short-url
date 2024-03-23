const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.TOKEN_SECRET || "123";

const generateToken = (user) => {
  const payload = {
    _id: user._id,
  };
  const token = jwt.sign(payload, SECRET);
  return token;
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload;
  } catch (err) {
    return null;
  }
};
module.exports = { generateToken, verifyToken };
