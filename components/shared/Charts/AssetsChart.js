import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { CHART_LABELS, DONUT, TOTAL_ASSET } from "../Constants";

function AssetsChart({ balances }) {
  const [state, setState] = useState({
    series: [10, 30, 20, 30],
    options: {
      chart: {
        type: DONUT,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: 0,
              },
              value: {
                show: true,
                fontSize: "14px",
                fontFamily: "Arial",
                offsetY: 5,
              },
              total: {
                show: true,
                fontSize: "12px",
                fontWeight: "800",
                fontFamily: "Arial",
                label: TOTAL_ASSET,
                formatter: function (w) {
                  return parseFloat(
                    w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0)
                  ).toFixed(2);
                },
              },
            },
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        width: 0,
      },
      labels: CHART_LABELS,
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 170,
              height: 175,
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (balances.length) {
      setState({
        ...state,
        series: balances.map((balance) => Number(balance.price)),
        options: {
          ...state.options,
          labels: balances.map((balance) => balance.dataTitle),
          colors: balances.map((balance) => balance.fillColor),
        },
      });
    }
  }, [balances]);

  return (
    <div id="">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type={DONUT}
        height={200}
      />
    </div>
  );
}

export default AssetsChart;
