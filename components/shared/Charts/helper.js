const LINE_CHART_INITIALS = {
  loading: true,
  series: [
    {
      name: "Running",
      data: [],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      width: [4],
      colors: ["#9568ff"],
      curve: "straight",
    },

    xaxis: {
      type: "text",
      categories: [],
    },
    colors: ["#9568ff"],
    markers: {
      size: [6],
      strokeWidth: [4],
      strokeColors: ["#9568ff"],
      border: 0,
      colors: ["#fff"],
      hover: {
        size: 10,
      },
    },
    yaxis: {
      title: {
        text: "",
      },
    },
  },
};
export { LINE_CHART_INITIALS };
