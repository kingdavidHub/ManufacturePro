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
    wareHouse1: 450,
    wareHouse2: 650,
    wareHouse3: 800,
  },
  {
    name: "Feb",
    wareHouse1: 550,
    wareHouse2: 750,
    wareHouse3: 900,
  },
  {
    name: "Mar",
    wareHouse1: 350,
    wareHouse2: 850,
    wareHouse3: 650,
  },
  {
    name: "Apr",
    wareHouse1: 650,
    wareHouse2: 450,
    wareHouse3: 750,
  },
  {
    name: "May",
    wareHouse1: 750,
    wareHouse2: 550,
    wareHouse3: 850,
  },
  {
    name: "Jun",
    wareHouse1: 850,
    wareHouse2: 650,
    wareHouse3: 450,
  },
  {
    name: "Jul",
    wareHouse1: 950,
    wareHouse2: 750,
    wareHouse3: 550,
  },
  {
    name: "Aug",
    wareHouse1: 850,
    wareHouse2: 850,
    wareHouse3: 650,
  },
  {
    name: "Sep",
    wareHouse1: 750,
    wareHouse2: 950,
    wareHouse3: 750,
  },
  {
    name: "Oct",
    wareHouse1: 650,
    wareHouse2: 850,
    wareHouse3: 850,
  },
  {
    name: "Nov",
    wareHouse1: 550,
    wareHouse2: 750,
    wareHouse3: 950,
  },
  {
    name: "Dec",
    wareHouse1: 450,
    wareHouse2: 650,
    wareHouse3: 850,
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
        <Line dataKey="wareHouse1" stroke="#7E7E7E" />
        <Line dataKey="wareHouse2" stroke="#363636" />
        <Line dataKey="wareHouse3" stroke="#141414" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default WareHouseChart;

// smooth chart type="monotone"
