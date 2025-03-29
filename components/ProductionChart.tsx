"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PRODUCTION_API } from "@/config";

interface ProductionItem {
  product_name: string;
  total_produced: number;
  total_distributed: number;
  remaining_stock: number;
}

const ProductionChart = () => {
  const [chartData, setChartData] = useState<ProductionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductionData = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get(`${PRODUCTION_API}`, {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });

        if (result.status === 200) {
          // Directly use the production data
          setChartData(result.data.data);
        }
      } catch (err) {
        console.error("Error fetching production data:", err);
        setError("Failed to load production data");

        // Fallback data when API fails
        setChartData([
          {
            product_name: "TABLE",
            total_produced: 601,
            total_distributed: 50,
            remaining_stock: 551,
          },
          {
            product_name: "CHAIR",
            total_produced: 6760,
            total_distributed: 150,
            remaining_stock: 6610,
          },
          {
            product_name: "DOOR",
            total_produced: 50,
            total_distributed: 0,
            remaining_stock: 50,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductionData();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-8">
        Loading production analytics...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Production Overview</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="product_name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_produced" name="Total Produced" fill="#7E7E7E" />
          <Bar
            dataKey="total_distributed"
            name="Total Distributed"
            fill="#363636"
          />
          <Bar
            dataKey="remaining_stock"
            name="Remaining Stock"
            fill="#141414"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductionChart;
