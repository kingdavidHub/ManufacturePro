"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Toaster, toast } from "sonner";
import OrdersChart from "@/components/OrdersChart";
import WareHouseChart from "@/components/WareHouseChart";
import WareHouseBarChart from "@/components/WareHouseBarChart";
import { CalendarDays, Circle, Folder, Truck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SALES_API } from "@/config";

interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  usagePercentage: number;
}

interface Order {
  id: string;
  amount: number;
  status: string;
  warehouseId: string;
  warehouse: {
    id: string;
    name: string;
    location: string;
    capacity: number;
  };
}

const UniqueDashboard = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${SALES_API}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });

        if (response.status === 200) {
          const orders = response.data.data.orders as Order[];

          // Group and process orders by warehouse
          const warehouseMap = new Map<
            string,
            {
              id: string;
              name: string;
              location: string;
              capacity: number;
              totalOrderedAmount: number;
            }
          >();

          // Process all orders
          orders.forEach((order) => {
            const { id, name, location, capacity } = order.warehouse;

            // Initialize warehouse data if not already in map
            if (!warehouseMap.has(id)) {
              warehouseMap.set(id, {
                id,
                name,
                location,
                capacity,
                totalOrderedAmount: 0,
              });
            }

            // Only count SUCCESSFUL orders for stock usage
            if (order.status === "SUCCESSFUL") {
              const warehouseData = warehouseMap.get(id)!;
              warehouseData.totalOrderedAmount += order.amount;
              warehouseMap.set(id, warehouseData);
            }
          });

          // Transform map to array and calculate metrics
          let warehouseData = Array.from(warehouseMap.values()).map((w) => {
            // Calculate remaining stock
            const currentStock = Math.max(0, w.capacity - w.totalOrderedAmount);

            // Calculate usage percentage
            const usagePercentage = Math.min(
              100,
              Math.round((w.totalOrderedAmount / w.capacity) * 100)
            );

            return {
              id: w.id,
              name: w.name,
              location: w.location,
              capacity: w.capacity,
              currentStock,
              usagePercentage,
            };
          });

          // Check if PrimeStorage exists, if not add it with default values
          const hasPrimeStorage = warehouseData.some(
            (w) => w.name === "PrimeStorage"
          );

          if (!hasPrimeStorage) {
            // Add PrimeStorage with default values if it doesn't exist in the API response
            warehouseData.push({
              id: "prime-storage-id", // Default ID
              name: "PrimeStorage",
              location: "LEKKI", // Default location
              capacity: 1000,
              currentStock: 750, // Default 25% usage
              usagePercentage: 25,
            });
          }

          // Sort warehouses by name for consistent display
          warehouseData = warehouseData.sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          setWarehouses(warehouseData);
        }
      } catch (error) {
        console.error("Failed to fetch order data:", error);
        toast.error("Failed to load warehouse data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col gap-6">
        <section>
          <div className="mx-auto">
            <div className="flex justify-between gap-4 md:shadow-md p-4 bg-white rounded-md">
              <Card
                newClass="hidden md:block"
                title="Total Revenue"
                value="83%"
                icon={<Folder />}
              />
              <Card
                title="Dispatched Shipments"
                value="2,167"
                icon={<Truck />}
              />
              <Card title="Total Customers" value="1000" icon={<Truck />} />
              <div
                className={`md:w-[25%] shadow-lg md:shadow-none rounded-sm md:rounded-none bg-[#FCFCFC] md:bg-white`}
              >
                <div className=" p-4 flex flex-col-reverse md:flex-col items-center md:items-start justify-between gap-2 md:gap-1">
                  <div className="flex flex-col-reverse md:flex-row items-center w-full justify-between gap-1 md:gap-0">
                    <div className="text-2xl font-semibold md:flex">
                      21/04<span className="hidden md:block">/2025</span>
                    </div>
                    <div className="text-gray-600">
                      <CalendarDays />
                    </div>
                  </div>
                  <h2 className="text-sm text-black font-bold md:font-normal md:text-gray-600 mt-2 text-center md:text-right">
                    Next Shipment
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hidden md:block">
          <div className="flex py-4 px-2 rounded-sm shadow-md items-center">
            <OrdersChart />
            <div className="flex flex-col gap-4 ml-4">
              <WarehouseContent
                color="#7E7E7E"
                fill="#7E7E7E"
                title="NextGen"
              />
              <WarehouseContent
                color="#363636"
                fill="#363636"
                title="SwiftStock"
              />
              <WarehouseContent
                color="#363636"
                fill="#363636"
                title="PrimeStorage"
              />
            </div>
          </div>
        </section>

        {/* Stock Levels section with dynamic data */}
        <section>
          <div className="py-6 px-4 rounded-sm shadow-md items-center">
            <h1 className="font-bold mb-2">Orders</h1>

            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                Loading orders data...
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {warehouses.map((warehouse) => (
                  <div key={warehouse.id} className="w-full">
                    <div className="flex justify-between">
                      <p>{warehouse.name}</p>
                      <p>{warehouse.currentStock}</p>
                      <p className="text-gray-500">
                        {warehouse.usagePercentage}%
                      </p>
                    </div>
                    <Progress
                      color={warehouse.usagePercentage > 70 ? "red" : "green"}
                      value={warehouse.usagePercentage}
                      className="w-full"
                    />
                  </div>
                ))}

                {warehouses.length === 0 && !isLoading && (
                  <div className="text-center text-gray-500 py-4">
                    No warehouse data available
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="md:hidden">
          <div className="py-4 px-2 rounded-sm shadow-md items-center">
            <WareHouseBarChart />
          </div>
        </section>
      </div>
    </>
  );
};

export default UniqueDashboard;

const WarehouseContent = ({
  color,
  fill,
  title,
}: {
  color: string;
  fill: string;
  title: string;
}) => {
  return (
    <div className="flex gap-2">
      <Circle fill={fill} color={color} />
      <p>{title}</p>
    </div>
  );
};

const Card = ({
  title,
  value,
  icon,
  newClass,
}: {
  title: string;
  value: string;
  newClass?: string;
  icon: React.ReactNode;
}) => {
  return (
    <div
      className={`md:w-[25%] ${newClass} shadow-lg md:shadow-none rounded-sm md:rounded-none bg-[#FCFCFC] md:bg-white `}
    >
      <div className="md:border-r border-gray-400 p-4 flex flex-col-reverse md:flex-col items-center md:items-start justify-between gap-2 md:gap-1 ">
        <div className="flex flex-col-reverse md:flex-row items-center w-full justify-between gap-1 md:gap-0">
          <div className="text-2xl font-semibold">{value}</div>
          <div className="text-gray-600">{icon}</div>
        </div>
        <h2 className="text-sm text-black font-bold md:font-normal md:text-gray-600 mt-2 text-center md:text-right">
          {title}
        </h2>
      </div>
    </div>
  );
};
