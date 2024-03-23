const User = require("../models/user");
const URL = require("../models/url");

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function getDaysInMonth(month, year) {
  if (month === 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    return 29; // Leap year
  } else if (month === 2) {
    return 28;
  } else {
    return monthDays[month - 1];
  }
}
const mockData = [0];
const mockLabel = [0];

const handlePostDuartionUrlsDaily = async (req, res) => {
  let data = [];
  let labels = [];
  let currentDate = Date.now();
  let currentHour = currentDate; // current hour
  let previousHour = currentDate - 1000 * 1 * 60 * 60; // 1 hour back
  try {
    const userId = req.currentUser._id;
    const user = await User.findById(userId);
    const userCreations = user.creations;
    const allUrls = await URL.find({ _id: { $in: userCreations } });
    for (let i = 1; i <= 24; i++) {
      let clicks = 0;
      allUrls.map((url) => {
        url.visitHistory.map((history) => {
          if (
            history.timestamp > previousHour &&
            history.timestamp < currentHour
          ) {
            clicks++;
          }
        });
      });
      labels.push(new Date(currentHour).getHours() + 1);
      data.push(clicks);
      clicks = 0;
      currentHour = previousHour;
      previousHour = currentDate - 1000 * (i + 1) * 60 * 60;
    }
    data = data.reverse();
    labels = labels.reverse();
    res.json({ data: data, labels: labels });
  } catch (err) {
    res.json({ data: mockData, labels: mockLabel });
  }
};

const handlePostDuartionUrlsWeekly = async (req, res) => {
  let data = [];
  let labels = [];
  let currentDate = Date.now();
  let currentDay = currentDate; // current day
  let previousDay = currentDate - 1000 * 1 * 24 * 60 * 60; // 1 day back
  try {
    const userId = req.currentUser._id;
    const user = await User.findById(userId);
    const userCreations = user.creations;
    const allUrls = await URL.find({ _id: { $in: userCreations } });
    for (let i = 1; i <= 7; i++) {
      let clicks = 0;
      allUrls.map((url) => {
        url.visitHistory.map((history) => {
          if (
            history.timestamp > previousDay &&
            history.timestamp < currentDay
          ) {
            clicks++;
          }
        });
      });
      labels.push(new Date(currentDay).getDate());
      data.push(clicks);
      clicks = 0;
      currentDay = previousDay;
      previousDay = currentDate - 1000 * (i + 1) * 24 * 60 * 60;
    }
    data = data.reverse();
    labels = labels.reverse();
    res.json({ data: data, labels: labels });
  } catch (err) {
    res.json({ data: mockData, labels: mockLabel });
  }
};

const handlePostDuartionUrlsMonthly = async (req, res) => {
  let data = [];
  let labels = [];
  let currentDate = Date.now();
  const fullDate = new Date(currentDate);
  const daysInMonth = getDaysInMonth(
    fullDate.getMonth() + 1,
    fullDate.getFullYear()
  );
  let currentDay = currentDate; // current date
  let previousDay = currentDate - 1000 * 1 * 24 * 60 * 60; // 1 date back
  try {
    const userId = req.currentUser._id;
    const user = await User.findById(userId);
    const userCreations = user.creations;
    const allUrls = await URL.find({ _id: { $in: userCreations } });
    for (let i = 1; i <= daysInMonth; i++) {
      let clicks = 0;
      allUrls.map((url) => {
        url.visitHistory.map((history) => {
          if (
            history.timestamp > previousDay &&
            history.timestamp < currentDay
          ) {
            clicks++;
          }
        });
      });
      labels.push(new Date(currentDay).getDate());
      data.push(clicks);
      clicks = 0;
      currentDay = previousDay;
      previousDay = currentDate - 1000 * (i + 1) * 24 * 60 * 60;
    }
    data = data.reverse();
    labels = labels.reverse();
    res.json({ data: data, labels: labels });
  } catch (err) {
    res.json({ data: mockData, labels: mockLabel });
  }
};

const handlePostDuartionUrlsYearly = async (req, res) => {
  let data = [];
  let labels = [];
  let currentDate = Date.now();
  let currentMonth = currentDate; // current date
  let fullDate = new Date(currentMonth);
  let daysInMonth = getDaysInMonth(
    fullDate.getMonth() + 1,
    fullDate.getFullYear()
  );
  let previousMonth = currentDate - 1000 * daysInMonth * 24 * 60 * 60; // 1 date back
  try {
    const userId = req.currentUser._id;
    const user = await User.findById(userId);
    const userCreations = user.creations;
    const allUrls = await URL.find({ _id: { $in: userCreations } });
    for (let i = 1; i <= 12; i++) {
      let clicks = 0;
      allUrls.map((url) => {
        url.visitHistory.map((history) => {
          if (
            history.timestamp > previousMonth &&
            history.timestamp < currentMonth
          ) {
            clicks++;
          }
        });
      });
      labels.push(new Date(currentMonth).getMonth() + 1);
      data.push(clicks);
      clicks = 0;
      currentMonth = previousMonth;
      fullDate = new Date(currentMonth);
      daysInMonth += getDaysInMonth(
        fullDate.getMonth() + 1,
        fullDate.getFullYear()
      );
      previousMonth = currentDate - 1000 * daysInMonth * 24 * 60 * 60;
    }
    data = data.reverse();
    labels = labels.reverse();
    res.json({ data: data, labels: labels });
  } catch (err) {
    res.json({ data: mockData, labels: mockLabel });
  }
};

module.exports = {
  handlePostDuartionUrlsDaily,
  handlePostDuartionUrlsWeekly,
  handlePostDuartionUrlsMonthly,
  handlePostDuartionUrlsYearly,
};
