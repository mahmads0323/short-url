const crypto = require("crypto");

const generateHash = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
};

const verifyHash = (password, salt, hash) => {
  const newhash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === newhash;
};

module.exports = { generateHash, verifyHash };
