const _data = require("./daily");
const _ = require("lodash");

const _dataToday = _data["2020-04-13"];

const getHBarData = (dataToday = _dataToday, order = "desc") => {
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

  console.log(orderedArray);
  return {
    labels: orderedArray.map(({ provincias }) => provincias),
    data: orderedArray.map(({ cases }) => cases),
  };
};

// console.log(getHBarData());

const formatVBarData = (dailyStats, numberOfBars = 14) => {
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
    newCases,
    newDeaths,
    dates,
  };
};

// console.log(formatVBarData(_data));

const formatLineData = (dailyStats, numberOfBars = 14) => {
  const totalCases = _(dailyStats).map("total_infections").value();
  const dates = _(Object.keys(dailyStats)).value();

  return {
    labels: dates,
    data: totalCases,
  };
};

console.log(formatLineData(_data));
