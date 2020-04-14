import React, { useState } from "react";
import { Card } from "components/Card/Card.jsx";
import ApexChart from "react-apexcharts";
import { hBarOptions } from "variables/chartOptions";

const HBar = ({ labels, data }) => {
  const series = [
    {
      data,
    },
  ];

  const options = {
    ...hBarOptions,
    xaxis: { categories: labels },
  };

  return (
    <ApexChart options={options} series={series} type="bar" height={380} />
  );
};

export default HBar;
