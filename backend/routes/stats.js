const express = require("express");
const {
  handlePostDuartionUrlsDaily,
  handlePostDuartionUrlsWeekly,
  handlePostDuartionUrlsMonthly,
  handlePostDuartionUrlsYearly,
} = require("../controllers/stats");

const statsRouter = express.Router();

statsRouter.get("/daily", handlePostDuartionUrlsDaily);
statsRouter.get("/weekly", handlePostDuartionUrlsWeekly);
statsRouter.get("/monthly", handlePostDuartionUrlsMonthly);
statsRouter.get("/yearly", handlePostDuartionUrlsYearly);

module.exports = statsRouter;
