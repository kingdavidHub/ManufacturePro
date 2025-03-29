"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
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
import { SALES_API } from "@/config";

interface Order {
  id: string;
  product: string;
  amount: number;
  status: string;
  createdAt: string;
  warehouse: {
    name: string;
  };
}

interface OrderResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  orders: Order[];
}

// This function transforms order data into chart-friendly format
const transformOrderData = (orders: Order[]) => {
  // Group orders by month
  const ordersByMonth: Record<string, Record<string, number>> = {};
  
  // Initialize with all months for consistent chart data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  months.forEach(month => {
    ordersByMonth[month] = {
      NextGen: 0,
      SwiftStock: 0,
      PrimeStorage: 0
    };
  });
  
  // Process each order
  orders.forEach(order => {
    // Only count successful orders
    if (order.status === "SUCCESSFUL") {
      const date = new Date(order.createdAt);
      const month = months[date.getMonth()];
      const warehouse = order.warehouse.name;
      
      // Add order amount to the appropriate warehouse and month
      if (ordersByMonth[month] && ordersByMonth[month][warehouse] !== undefined) {
        ordersByMonth[month][warehouse] += order.amount;
      }
    }
  });
  
  // Convert to array format for recharts
  return months.map(month => ({
    name: month,
    ...ordersByMonth[month]
  }));
};

const OrdersChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get(`${SALES_API}?limit=100`, {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        
        if (result.status === 200) {
          const data = result.data.data as OrderResponse;
          const transformedData = transformOrderData(data.orders);
          setChartData(transformedData);
        }
      } catch (err) {
        console.error("Error fetching order data:", err);
        setError("Failed to load order data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) return <div>Loading order analytics...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Orders by Warehouse</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="NextGen" stroke="#7E7E7E" />
          <Line type="monotone" dataKey="SwiftStock" stroke="#363636" />
          <Line type="monotone" dataKey="PrimeStorage" stroke="#141414" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;