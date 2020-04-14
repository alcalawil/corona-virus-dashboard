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

console.log(getHBarData());