import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { Stats } from "components/Stats/Stats.jsx";
import { Curve } from "components/Charts/Curve";
import { Bar } from "components/Charts/Bar";
import {
  dataPie,
  legendPie,
  legendCurve,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
} from "variables/Variables.jsx";
import moment from "moment";
import axios from "axios";

const Dashboard = (props) => {
  const [dailyStats, setDailyStats] = useState({});
  const defaultDate = moment().subtract(1, "day").format("YYYY-MM-DD");
  const [date, setDate] = useState(defaultDate);

  const fetchData = async () => {
    try {
      const response = await axios(
        "https://argentina-covid19-data.now.sh/api/v0/daily"
      );

      setDailyStats(response.data || {});
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDateChange = (date) => {
    setDate(date);
  };

  const { total_infections, total_deaths, new_cases, new_deaths } =
    dailyStats[date] || {};

  const dataCurve = getDataCurve(dailyStats);
  const dataBar = getDataBar(dailyStats);

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Stats
            total_infections={total_infections}
            total_deaths={total_deaths}
            new_cases={new_cases}
            new_deaths={new_deaths}
            date={date}
          />
        </Row>

        {/* Charts */}
        <Row>
          <Col md={9}>
            <Curve legend={createLegend(legendCurve)} data={dataCurve} />
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <Bar legend={createLegend(legendBar)} data={dataBar} />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Dashboard;

// TODO: Pasar esto a utils o algo así
const getDataCurve = (dailyStats) => {
  const dailyStatsAsEntries = Object.entries(dailyStats);
  const dates = Object.keys(dailyStats);

  const dataCurve = {
    labels: dates.map((d) => moment(d).format("DD-MM")),
    series: [dailyStatsAsEntries.map((c) => c[1].total_infections)],
  };
  return dataCurve;
};

const getDataBar = (dailyStats) => {
  const numberOfBars = 10;
  const dailyStatsAsEntries = Object.entries(dailyStats);
  const dates = Object.keys(dailyStats);
  const dataBar = {
    labels: dates
      .map((d) => moment(d).format("DD-MM"))
      .slice(dates.length - numberOfBars),
    series: [
      dailyStatsAsEntries
        .map((c) => c[1].new_cases)
        .slice(dates.length - numberOfBars),
      dailyStatsAsEntries
        .map((c) => c[1].new_deaths)
        .slice(dates.length - numberOfBars),
    ],
  };
  return dataBar;
};

const createLegend = (json) => {
  var legend = [];
  for (var i = 0; i < json["names"].length; i++) {
    var type = "fa fa-circle text-" + json["types"][i];
    legend.push(<i className={type} key={i} />);
    legend.push(" ");
    legend.push(json["names"][i]);
  }
  return legend;
};
