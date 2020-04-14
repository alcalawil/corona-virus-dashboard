import moment from "moment";

export const getDataCurve = (dailyStats) => {
  const dailyStatsAsEntries = Object.entries(dailyStats);
  const dates = Object.keys(dailyStats);

  const dataCurve = {
    labels: dates.map((d) => moment(d).format("DD-MM")),
    series: [dailyStatsAsEntries.map((c) => c[1].total_infections)],
  };
  return dataCurve;
};

export const getDataBar = (dailyStats) => {
  const numberOfBars = 30;
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
      // dailyStatsAsEntries
      //   .map((c) => c[1].new_deaths)
      //   .slice(dates.length - numberOfBars),
    ],
  };
  return dataBar;
};
