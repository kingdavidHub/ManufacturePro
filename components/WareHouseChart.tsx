"use client";

import {
  ResponsiveContainer,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const chartData = [
  {
    name: "Jan",
    NextGen: 450,
    SwiftStock: 650,
    PrimeStorage: 800,
  },
  {
    name: "Feb",
    NextGen: 550,
    SwiftStock: 750,
    PrimeStorage: 900,
  },
  {
    name: "Mar",
    NextGen: 350,
    SwiftStock: 850,
    PrimeStorage: 650,
  },
  {
    name: "Apr",
    NextGen: 650,
    SwiftStock: 450,
    PrimeStorage: 750,
  },
  {
    name: "May",
    NextGen: 750,
    SwiftStock: 550,
    PrimeStorage: 850,
  },
  {
    name: "Jun",
    NextGen: 850,
    SwiftStock: 650,
    PrimeStorage: 450,
  },
  {
    name: "Jul",
    NextGen: 950,
    SwiftStock: 750,
    PrimeStorage: 550,
  },
  {
    name: "Aug",
    NextGen: 850,
    SwiftStock: 850,
    PrimeStorage: 650,
  },
  {
    name: "Sep",
    NextGen: 750,
    SwiftStock: 950,
    PrimeStorage: 750,
  },
  {
    name: "Oct",
    NextGen: 650,
    SwiftStock: 850,
    PrimeStorage: 850,
  },
  {
    name: "Nov",
    NextGen: 550,
    SwiftStock: 750,
    PrimeStorage: 950,
  },
  {
    name: "Dec",
    NextGen: 450,
    SwiftStock: 650,
    PrimeStorage: 850,
  },
];

const WareHouseChart = () => {
  return (
    <ResponsiveContainer width="70%" height={400}>
      <LineChart data={chartData}>
        <XAxis dataKey={"name"} />
        <YAxis
          domain={[100, 1000]}
          ticks={[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
        />
        <CartesianGrid stroke="#eee" />
        <Tooltip />
        {/* <Legend /> */}
        <Line dataKey="NextGen" stroke="#7E7E7E" />
        <Line dataKey="SwiftStock" stroke="#363636" />
        <Line dataKey="PrimeStorage" stroke="#363636" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default WareHouseChart;

// smooth chart type="monotone"
