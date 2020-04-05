import React from "react";
import ChartistGraph from "react-chartist";
import { Card } from "components/Card/Card.jsx";
import { optionsCurve, responsiveCurve } from "variables/Variables.jsx";

export const Curve = ({ legend, data }) => {
  return (
    <React.Fragment>
      <Card
        statsIcon="fa fa-history"
        id="chart-curve"
        title="Curva de crecimiento por día"
        category="TODO"
        stats="Updated 3 minutes ago"
        content={
          <div className="ct-chart">
            <ChartistGraph
              data={data}
              type="Line"
              options={optionsCurve}
              responsiveOptions={responsiveCurve}
            />
          </div>
        }
        legend={<div className="legend">{legend}</div>}
      />
    </React.Fragment>
  );
};

export default Curve;
