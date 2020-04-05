import React from "react";
import Card from "./card";

const Stats = props => {
  const { total_infections, total_deaths, new_cases, new_deaths } = props.stats;
  return (
    <div>
      <div className="row">
        <Card name="Nuevos Infectados" count={new_cases} type="primary" />
        <Card name="Nuevos muertos" count={new_deaths} type="success" />
      </div>
      <div className="row">
        <Card name="Total Infectados" count={total_infections} type="info" />
        <Card name="Total muertos" count={total_deaths} type="danger" />
      </div>
    </div>
  );
};

export default Stats;
