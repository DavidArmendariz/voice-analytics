import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const SimpleBarChart = ({ data, options }) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="frequency" name={options.name} fill={options.color} />
    </BarChart>
  );
};

export default SimpleBarChart;
