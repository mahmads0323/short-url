const express = require("express");
const { handleRegisterUser, handleLoginUser } = require("../controllers/user");
const checkAuthentication = require("../middlewares/authentication");

const router = express.Router();

router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
router.post("/", checkAuthentication("token"), (req, res) => {
  res.json({ success: "ok" });
});

module.exports = router;
