/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
} from "variables/Variables.jsx";
import moment from "moment";
import axios from "axios";

const Dashboard = () => {
  const [dailyStats, setDailyStats] = useState({});
  const defaultDate = moment().subtract(1, "day").format("YYYY-MM-DD");
  const [date, setDate] = useState(defaultDate);

  const fetchData = async () => {
    try {
      const response = await axios(
        "https://argentina-covid19-data.now.sh/api/v0/daily"
      );

      const dailyStats = response.data[date] || {};
      console.log(dailyStats);
      setDailyStats(dailyStats);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  const onDateChange = (date) => {
    setDate(date);
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

  const { total_infections, total_deaths, new_cases, new_deaths } = dailyStats;

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-add-user text-success" />}
              statsText="Casos del día"
              statsValue={`+${new_cases}`}
              statsIcon={<i className="fa fa-calendar-o" />}
              statsIconText={date}
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="fa pe-7s-delete-user text-danger" />}
              statsText="Muertes del día"
              statsValue={`+${new_deaths}`}
              statsIcon={<i className="fa fa-calendar-o" />}
              statsIconText={date}
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="fa pe-7s-graph1 text-danger" />}
              statsText="Total casos"
              statsValue={total_infections}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText={`Actualizado hasta el ${date}`} // FIXME: Usar la ultima fecha disponible
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="fa pe-7s-graph1 text-info" />}
              statsText="Total muertes"
              statsValue={total_deaths}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText={`Hasta el ${date}`}
            />
          </Col>
        </Row>

        {/* Charts */}
        <Row>
          <Col md={8}>
            <Card
              statsIcon="fa fa-history"
              id="chartHours"
              title="Curva de crecimiento por día"
              category="TODO"
              stats="Updated 3 minutes ago"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataSales}
                    type="Line"
                    options={optionsSales}
                    responsiveOptions={responsiveSales}
                  />
                </div>
              }
              legend={<div className="legend">{createLegend(legendSales)}</div>}
            />
          </Col>
          <Col md={4}>
            <Card
              statsIcon="fa fa-clock-o"
              title="Distribución por Provincias"
              category="TODO"
              stats="Campaign sent 2 days ago"
              content={
                <div
                  id="chartPreferences"
                  className="ct-chart ct-perfect-fourth"
                >
                  <ChartistGraph data={dataPie} type="Pie" />
                </div>
              }
              legend={<div className="legend">{createLegend(legendPie)}</div>}
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Card
              id="chartActivity"
              title="2014 Sales"
              category="All products including Taxes"
              stats="Data information certified"
              statsIcon="fa fa-check"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataBar}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                  />
                </div>
              }
              legend={<div className="legend">{createLegend(legendBar)}</div>}
            />
          </Col>

          <Col md={6}>
            <Card
              title="Tasks"
              category="Backend development"
              stats="Updated 3 minutes ago"
              statsIcon="fa fa-history"
              content={
                <div className="table-full-width">
                  <table className="table">
                    <Tasks />
                  </table>
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
