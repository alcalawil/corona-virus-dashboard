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
import HBar from "components/Charts/HBar";
import VBar from "components/Charts/VBar";
import LineChart from "components/Charts/Line";
import {
  getHBarData,
  formatVBarData,
  formatLineData,
} from "../util/formatChartData";

const DATE_FORMAT = "YYYY-MM-DD";

const Dashboard = () => {
  const [dailyStats, setDailyStats] = useState({});

  const minDate = "2020-03-03";
  const maxDate = moment().format(DATE_FORMAT); // TODO: improve this
  const [date, setDate] = useState(
    moment().subtract(1, "day").format(DATE_FORMAT)
  );

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
    setDate(date.format(DATE_FORMAT));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { total_infections, total_deaths, new_cases, new_deaths } =
    dailyStats[date] || {};

  const dataCurve = getDataCurve(dailyStats);
  const dataBar = getDataBar(dailyStats);
  const dataHbar = getHBarData(dailyStats[date]);
  const dataVBar = formatVBarData(dailyStats);
  const lineData = formatLineData(dailyStats);

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          {dailyStats[date] ? (
            <Stats
              total_infections={total_infections}
              total_deaths={total_deaths}
              new_cases={new_cases}
              new_deaths={new_deaths}
              date={date}
            />
          ) : (
            <h4>Lo sentimos. Esta data aún no está disponoble</h4>
          )}
        </Row>
        {/* Charts */}
        <Row>
          <Col md={9}>
            {dataHbar.data.length ? (
              <LineChart labels={lineData.labels} data={lineData.data} />
            ) : (
              <h4>Data no disponible</h4>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            {/* <Bar legend={createLegend(legendBar)} data={dataBar} /> */}
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            {dataHbar.data.length ? (
              <HBar data={dataHbar.data} labels={dataHbar.labels} />
            ) : (
              <h4>Data no disponible</h4>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            {dataHbar.data.length ? (
              <VBar labels={dataVBar.labels} series={dataVBar.series} />
            ) : (
              <h4>Data no disponible</h4>
            )}
          </Col>
        </Row>
      </Grid>
      <DatePicker
        onChange={onDatePickerChange}
        minDate={minDate}
        maxDate={maxDate}
        defaultDate={date}
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
