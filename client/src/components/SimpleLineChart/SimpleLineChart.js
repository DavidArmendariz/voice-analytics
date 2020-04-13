import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import extractKeys from "../../utils/ExtractKeys";

const SimpleLineChart = ({ data, xAxisDataKey = "date" }) => {
  const series = extractKeys(data[0], xAxisDataKey);
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <XAxis dataKey={xAxisDataKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {series.map((dataKey, index) => (
        <Line key={index} type="monotone" dataKey={dataKey} stroke="#82ca9d" />
      ))}
    </LineChart>
  );
};

export default SimpleLineChart;
