import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { vBarOptions } from "variables/chartOptions";

const VBar = ({ labels, series }) => {
  const _series = [
    {
      name: "Casos",
      data: series.newCases,
    },
    {
      name: "Muertes",
      data: series.newDeaths,
    },
  ];
  const options = { ...vBarOptions, xaxis: { categories: labels } };

  return (
    <div id="vbar">
      <ReactApexChart
        options={options}
        series={_series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default VBar;
