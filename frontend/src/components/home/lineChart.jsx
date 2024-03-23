import  { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import getAllUrlStats from "../../services/getAllUrlStats";

const dateLabels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const options = {
  responsive: true,
  title: {
    display: false,
    text: "Line Chart Example",
  },
  scales: {
    display: false,
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
        },
      },
    ],
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const LineChart = () => {
  const [chartData, setChartData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0);
  const [previousMonthClicks, setPreviousMonthClicks] = useState(0);
  const [monthCount, setMonthCount] = useState(1);

  const getStats = async () => {
    const responseData = await getAllUrlStats(monthCount);
    const clicksData = responseData.data;
    const labels = responseData.monthNames
      ? responseData.monthNames
      : dateLabels;
    setDataFetched(true);
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "clicks",
          data: clicksData,
          borderColor: "#7743DB",
          pointRadius: 5,
          pointHitRadius: 10,
        },
      ],
    });
    const allClicks = clicksData.reduce((a, b) => a + b, 0);
    setTotalClicks(allClicks);
    setPreviousMonthClicks(
      responseData.previousMonthClicks === (0 || undefined)
        ? 1
        : responseData.previousMonthClicks
    );
  };

  useEffect(() => {
    getStats();
  }, [monthCount]);

  const handleSelectionChange = (e) => {
    setMonthCount(e.target.value);
  };
  return (
    <>
      {dataFetched && (
        <div className="bg-white flex flex-col space-y-4 rounded-lg p-4 border border-black border-solid">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-sm">Clicks</p>
              <p>
                {totalClicks + " "}
                <span
                  className={`text-${
                    totalClicks >= previousMonthClicks ? "green" : "red"
                  }-600 font-bold text-xs`}
                >
                  {totalClicks >= previousMonthClicks ? "+" : "-"}
                  {((totalClicks / previousMonthClicks) * 100).toFixed(5)}%
                </span>
              </p>
            </div>
            <div>
              <select
                name="timeDuration"
                id="timeDuration"
                className="border border-black rounded-lg border-solid focus:outline-none cursor-pointer"
                onChange={handleSelectionChange}
              >
                <option value={1}>This month</option>
                <option value={3}>Last 3 months</option>
                <option value={6}>Last 6 months</option>
                <option value={12}>Last year</option>
              </select>
            </div>
          </div>
          <Line options={options} data={chartData} />
        </div>
      )}
    </>
  );
};

export default LineChart;
