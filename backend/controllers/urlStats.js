const URL_STAT = require("../models/urlStats");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getAppropiateYear(currentYear, currentMonth, numberToGoBack) {
  if (currentMonth - numberToGoBack <= 0) {
    return currentYear - 1;
  }
  return currentYear;
}

const IncrementClickCounter = async () => {
  const fullDate = new Date();
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();
  const formattedDate = new Date(year, month - 1, date);
  const urlStat = await URL_STAT.updateOne(
    {
      year: year,
      month: month,
      "dates.date": formattedDate,
    },
    { $inc: { "dates.$.dailyclicks": 1 } }
  );
  // supposing year and month found and date not found, so push date to month
  if (urlStat.modifiedCount === 0) {
    const addDateToMonth = await URL_STAT.updateOne(
      { year: year, month: month },
      { $push: { dates: { date: formattedDate, dailyclicks: 1 } } }
    );
    //year or month not found, so add it
    if (addDateToMonth.modifiedCount === 0) {
      await URL_STAT.create({
        year: year,
        month: month,
        dates: [{ date: formattedDate, dailyclicks: 1 }],
      });
      return;
    }
  }
  return;
};

const getClicks = async (req, res) => {
  const fullDate = new Date();
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth() + 1; // index based
  const previousOfPreviousMonth = month <= 2 ? (month == 2 ? 12 : 11) : month; // to get data for 11 or 12 month for 1 or 2 month resectively
  const numberOfDays = getDaysInMonth(previousOfPreviousMonth, year);
  try {
    const monthsDataRequired = Number(req.headers.x_months);
    if (monthsDataRequired == 1) {
      let data = [];
      let i = 0;
      let k = 0;
      const result =
        (await URL_STAT.findOne({
          year: getAppropiateYear(year, month, 1),
          month: month,
        }).sort({ $natural: -1 })) || []; // for first time only
      const previousMonthResult =
        (await URL_STAT.findOne({
          year: {
            $gte: getAppropiateYear(year, month, 2),
          },
          month: { $nin: month },
        }).sort({ $natural: -1 })) || []; // for first time only
      const previousMonthClicks = previousMonthResult.dates?.reduce(
        (a, b) => a + b.dailyclicks,
        0
      );
      while (i < numberOfDays) {
        const temp = new Date(result?.dates[k]?.date).getDate();
        if (i + 1 == temp) {
          data.push(result.dates[k].dailyclicks);
          k++;
        } else {
          data.push(0);
        }
        i++;
      }
      return res
        .status(200)
        .json({ data: data, previousMonthClicks: previousMonthClicks });
    } else {
      const monthNames = [];
      let currentMonthIndex;
      const results = await URL_STAT.find({
        year: { $gte: getAppropiateYear(year, month, 12) },
        month: { $gte: 1, $lte: 12 },
      })
        .limit(monthsDataRequired)
        .sort({ $natural: -1 });

      const previousMonthRequiredResult = await URL_STAT.find({
        year: {
          $gte: getAppropiateYear(year - 1, month, 2 * monthsDataRequired), // -1 in case of 12 months
        },
        month: { $gte: 1, $lte: 12 },
      })
        .skip(monthsDataRequired)
        .sort({ $natural: -1 })
        .limit(monthsDataRequired);
      const monthRequiredClicks = results.map((month) => {
        monthNames.push(months[month.month - 1]);
        currentMonthIndex = month.month -1;
        return month.dates.reduce((a, b) => a + b.dailyclicks, 0);
      });
      const previousMonthRequiredClicks = previousMonthRequiredResult.map(
        (month) => month.dates.reduce((a, b) => a + b.dailyclicks, 0)
      );
      const previousAllMonthRequiredClicks = previousMonthRequiredClicks.reduce(
        (a, b) => a + b,
        0
      );
      if(monthNames.length < monthsDataRequired){
        while(monthNames.length != monthsDataRequired){
          if(currentMonthIndex === 0){
            currentMonthIndex = 12;
          }
           monthNames.unshift(months[currentMonthIndex-1])
           monthRequiredClicks.unshift(0)
           currentMonthIndex--;
        }
      }
      return res.status(200).json({
        data: monthRequiredClicks,
        previousMonthClicks: previousAllMonthRequiredClicks,
        monthNames: monthNames,
      });
    }
  } catch (err) {
    return res.status(200).json({
      data: [0],
      previousMonthClicks: 0,
    });
  }
};

function getDaysInMonth(month, year) {
  if (month === 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    return 29; // Leap year
  } else if (month === 2) {
    return 28;
  } else {
    return monthDays[month - 1];
  }
}

module.exports = { IncrementClickCounter, getClicks };
