const es = require("./locale_es");

export const provincias = [
  "caba",
  "buenos_aires",
  "catamarca",
  "chaco",
  "chubut",
  "cordoba",
  "corrientes",
  "entre_rios",
  "formosa",
  "jujuy",
  "la_pampa",
  "la_rioja",
  "mendoza",
  "misiones",
  "neuquen",
  "rio_negro",
  "salta",
  "san_juan",
  "san_luis",
  "santa_cruz",
  "santa_fe",
  "sgo_del_stero",
  "tierra_del_fuego",
  "tucuman",
];

export const hBarOptions = {
  chart: {
    type: "bar",
    height: 380,
    locales: [es],
    defaultLocale: "es",
  },
  plotOptions: {
    bar: {
      barHeight: "100%",
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: "bottom",
      },
    },
  },
  colors: [
    "#33b2df",
    "#546E7A",
    "#d4526e",
    "#13d8aa",
    "#A5978B",
    "#2b908f",
    "#f9a3a4",
    "#90ee7e",
    "#f48024",
    "#69d2e7",
  ],
  dataLabels: {
    enabled: true,
    textAnchor: "start",
    style: {
      colors: ["#fff"],
    },
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
    },
    offsetX: 0,
    dropShadow: {
      enabled: true,
    },
  },
  stroke: {
    width: 1,
    colors: ["#fff"],
  },
  // xaxis: {
  //   categories: provincias,
  // },
  yaxis: {
    labels: {
      show: false,
    },
  },
  title: {
    text: "Casos por provincias",
    align: "center",
    floating: true,
  },
  subtitle: {
    text: "Category Names as DataLabels inside bars",
    align: "center",
  },
  tooltip: {
    theme: "dark",
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return "";
        },
      },
    },
  },
};

export const vBarOptions = {
  chart: {
    type: "bar",
    height: 350,
    locales: [es],
    defaultLocale: "es",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  },
  yaxis: {
    title: {
      text: "Totales por dia",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " personas";
      },
    },
  },
};
