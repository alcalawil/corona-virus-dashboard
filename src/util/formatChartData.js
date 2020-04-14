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
