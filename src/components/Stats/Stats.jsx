import React from "react";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Col } from "react-bootstrap";

export const Stats = ({
  new_cases,
  new_deaths,
  total_deaths,
  total_infections,
  date,
}) => {
  return (
    <React.Fragment>
      <Col lg={3} sm={6}>
        <StatsCard
          bigIcon={<i className="pe-7s-add-user text-info" />}
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
          bigIcon={<i className="fa pe-7s-graph1 text-info" />}
          statsText="Total casos"
          statsValue={total_infections}
          statsIcon={<i className="fa fa-refresh" />}
          statsIconText={`Hasta el ${date}`} // FIXME: Usar la ultima fecha disponible
        />
      </Col>
      <Col lg={3} sm={6}>
        <StatsCard
          bigIcon={<i className="fa pe-7s-graph1 text-danger" />}
          statsText="Total muertes"
          statsValue={total_deaths}
          statsIcon={<i className="fa fa-refresh" />}
          statsIconText={`Hasta el ${date}`}
        />
      </Col>
    </React.Fragment>
  );
};

export default Stats;
