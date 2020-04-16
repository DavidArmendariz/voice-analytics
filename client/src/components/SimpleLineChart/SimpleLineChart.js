import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const SimpleLineChart = ({ data, options }) => {
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
      <XAxis dataKey={options.horizontalAxis} />
      <YAxis />
      <Tooltip />
      <Legend />
      {options.series.map((dataKey, index) => (
        <Line key={index} type="monotone" dataKey={dataKey} name={options.seriesNames[dataKey]} stroke={options.colors[dataKey]} />
      ))}
    </LineChart>
  );
};

export default SimpleLineChart;
