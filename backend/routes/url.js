const express = require("express");
const {
  handlePostUrl,
  handlePostPasswordandGetUrl,
  handleSpecifiedNumberOfUrls,
  handleDeleteUrl,
} = require("../controllers/url");
const checkAuthentication = require("../middlewares/authentication");

const router = express.Router();

router.post(
  "/allurls",
  checkAuthentication("token"),
  handleSpecifiedNumberOfUrls
);
router.delete("/delete", checkAuthentication("token"), handleDeleteUrl);
router.post("/", checkAuthentication("token"), handlePostUrl);
router.route("/:shortUrl").post(handlePostPasswordandGetUrl);

module.exports = router;
