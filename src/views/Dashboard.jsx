import React, { useEffect, useState } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
// Components
import { Stats } from "components/Stats/Stats";
import { Curve } from "components/Charts/Curve";
import { Bar } from "components/Charts/Bar";
import { legendCurve, legendBar } from "variables/Variables";
import DatePicker from "components/DatePicker/DatePicker";
import { getDataBar, getDataCurve } from "../util";

const Dashboard = () => {
  const [dailyStats, setDailyStats] = useState({});
  // TODO: Default date today. Validate if there is data before rendering charts
  const defaultDate = moment().subtract(1, "day").format("YYYY-MM-DD");
  const [date, setDate] = useState(defaultDate);
  const minDate = Object.keys(dailyStats)[0];

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

  const onDatePickerChange = (date) => {
    setDate(date.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <DatePicker
        onChange={onDatePickerChange}
        minDate={minDate}
        maxDate={defaultDate}
      />
    </div>
  );
};

export default Dashboard;

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
