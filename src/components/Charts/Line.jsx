import React from "react";
import ReactApexChart from "react-apexcharts";
import { lineOptions } from "variables/chartOptions";

const LineChart = ({ data, labels }) => {
  const series = [
    {
      name: "Casos acumulados",
      data,
    },
  ];

  const options = {
    ...lineOptions,
    labels,
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
