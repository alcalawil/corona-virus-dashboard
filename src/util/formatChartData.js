const _ = require("lodash");

export const getHBarData = (dataToday, order = "desc") => {
  if (!dataToday) {
    return { labels: [], data: [] };
  }

  const entries = Object.entries(dataToday);
  const casesByProvincia = entries.map(([prov, { confirmed }]) => {
    if (confirmed) {
      // exclude prov with 0 cases and no provincias
      return {
        provincias: prov,
        cases: confirmed,
      };
    }
    return null;
  });

  const orderedArray = _(casesByProvincia)
    .compact()
    .orderBy(["cases"], order)
    .value();

  return {
    labels: orderedArray.map(({ provincias }) => provincias),
    data: orderedArray.map(({ cases }) => cases),
  };
};

export const formatVBarData = (dailyStats, numberOfBars = 14) => {
  const newCases = _(dailyStats)
    .map("new_cases")
    .takeRight(numberOfBars)
    .value();
  const newDeaths = _(dailyStats)
    .map("new_deaths")
    .takeRight(numberOfBars)
    .value();
  const dates = _(Object.keys(dailyStats)).takeRight(numberOfBars).value();

  return {
    labels: dates,
    series: {
      newCases,
      newDeaths,
    },
  };
};

export const formatLineData = (dailyStats) => {
  const totalCases = _(dailyStats).map("total_infections").value();
  const dates = _(Object.keys(dailyStats)).value();

  return {
    labels: dates,
    data: totalCases,
  };
};
