const User = require("../models/user");
const { generateHash, verifyHash } = require("../utils/passwordUtils");
const { generateToken } = require("../utils/authentication");

const handleRegisterUser = async (req, res) => {
  const body = req.body;
  const { salt, hash } = generateHash(body.password);
  try {
    const newUser = await User.create({
      name: body.name,
      email: body.email,
      salt: salt,
      hash: hash,
    });

    const token = generateToken(newUser);
    return res.json({ token: token });
  } catch (err) {
    return res.status(200).json({ error: "user already exists" });
  }
};

const handleLoginUser = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(400).json({ emailError: "user not exists" });
  }
  const validateHash = verifyHash(body.password, user.salt, user.hash);
  if (!validateHash) {
    return res.status(401).json({ passwordError: "incorrect password" });
  }
  const token = generateToken(user);
  res.json({ token: token });
};

module.exports = { handleRegisterUser, handleLoginUser };
