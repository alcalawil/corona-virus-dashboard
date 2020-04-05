import React from "react";
import ChartistGraph from "react-chartist";
import { Card } from "components/Card/Card.jsx";
import { optionsBar, responsiveBar } from "variables/Variables.jsx";

export const Bar = ({ legend, data }) => {
  return (
    <React.Fragment>
      <Card
        id="casesVsDeaths"
        title="Casos vs Muertes"
        category="Últimos 10 días"
        stats="Data information certified"
        statsIcon="fa fa-check"
        content={
          <div className="ct-chart">
            <ChartistGraph
              data={data}
              type="Bar"
              options={optionsBar}
              responsiveOptions={responsiveBar}
            />
          </div>
        }
        legend={<div className="legend">{legend}</div>}
      />
    </React.Fragment>
  );
};

export default Bar;
