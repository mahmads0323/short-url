const mongoose = require("mongoose");

const dailyStats = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  dailyclicks: {
    type: Number,
    // required: true,
  },
});

const urlStats = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  dates: [dailyStats],
});

const URL_STAT = mongoose.model("URL_STAT", urlStats);

module.exports = URL_STAT;
