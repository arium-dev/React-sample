import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Spinner from "../Spinner";
import { CHART_KEYS } from "./constants";
import { LINE_CHART_INITIALS } from "./helper";

const LineChart = ({
  name = "",
  data,
  loading,
  className = "",
  options = {},
}) => {
  const [chartData, setChartData] = useState(LINE_CHART_INITIALS);

  useEffect(() => {
    if (loading) {
      setChartData((prev) => ({ ...prev, loading }));
    } else {
      setChartData((prev) => ({
        ...prev,
        loading,
        series: [{ name: name, data: data.data }],
        options: {
          ...prev.options,
          xaxis: { type: CHART_KEYS.TEXT, categories: data.label },
          ...options,
        },
      }));
    }
  }, [data, loading, name, options]);

  return (
    <div id="chart" className={`bar-chart ${className}`}>
      {chartData?.loading ? (
        <div className="coin-card-spinner text-primary">
          <Spinner color="text-primary" size={30} />
        </div>
      ) : (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type={CHART_KEYS.AREA}
          height={300}
        />
      )}
    </div>
  );
};

export default LineChart;
