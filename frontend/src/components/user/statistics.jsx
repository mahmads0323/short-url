import { Line } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { useEffect, useState } from "react";
import getUserUrlStats from "../../services/getUserUrlStats";

const options = {
  responsive: true,
  title: {
    display: false,
    text: "link Statistics",
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const StatisticsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [statsCase, setStatsCase] = useState("1day");
  const [totalClicks, setTotalClicks] = useState(0);

  const fetchData = async () => {
    const responseData = await getUserUrlStats(statsCase);
    setTotalClicks(responseData.data.reduce((a, b) => a + b, 0));
    setChartData({
      labels: responseData.labels,
      datasets: [
        {
          label: "clicks",
          data: responseData.data,
          borderColor: "#7743DB",
          pointRadius: 5,
          pointHitRadius: 10,
        },
      ],
    });
    setDataFetched(true);
  };

  useEffect(() => {
    fetchData();
  }, [statsCase]);

  const handleSelectionChange = (e) => {
    setStatsCase(e.target.value);
  };
  return (
    <section>
      <div className="flex justify-center p-4 px-8 bg-lightGreyishOrange ">
        <div className="py-2 flex flex-col space-y-4 w-full rounded-lg p-4 border bg-white border-black sm:w-[90%] md:w-[70%] lg:w-[55%]">
          <div className="flex w-full px-4 justify-between items-center bg-lightGreyishOrange rounded-xl shadow-sm shadow-lightPurple py-2">
            <p className="text-sm">
              Total clicks{" "}
              <span className="font-semibold text-purple">{totalClicks}</span>
            </p>
            <div className="flex space-x-1 text-sm">
              <select
                name="urlIntervalStats"
                id="urlIntervalStats"
                className="border border-black rounded-lg border-solid focus:outline-none  cursor-pointer"
                onChange={handleSelectionChange}
              >
                <option value="1day">24 hours</option>
                <option value="7days">7 days</option>
                <option value="1month">1 month</option>
                <option value="1year">1 year</option>
              </select>
            </div>
          </div>
          <div>
            {!dataFetched ? (
              "Loading..."
            ) : (
              <Line options={options} data={chartData} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsChart;
