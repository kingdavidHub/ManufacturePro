"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Toaster, toast } from "sonner";
import OrdersChart from "@/components/OrdersChart";
import ProductionChart from "@/components/ProductionChart";
import WareHouseBarChart from "@/components/WareHouseBarChart";
import { CalendarDays, Circle, Folder, Package, Truck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PRODUCTION_API, SALES_API } from "@/config";

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

interface ProductionData {
  product_name: string;
  total_produced: number;
  total_distributed: number;
  remaining_stock: number;
  stockPercentage?: number; // Added for UI calculations
}

const UniqueDashboard = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [productionData, setProductionData] = useState<ProductionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductionData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${PRODUCTION_API}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });

        if (response.status === 200) {
          // Get production data from the API response
          const products = response.data.data;

          // Calculate stock percentage for each product
          const processedData = products.map((product: ProductionData) => {
            // Calculate what percentage of produced items remain in stock
            const stockPercentage =
              product.total_produced > 0
                ? Math.round(
                    (product.remaining_stock / product.total_produced) * 100
                  )
                : 0;

            return {
              ...product,
              stockPercentage,
            };
          });

          setProductionData(processedData);
        }
      } catch (error) {
        console.error("Failed to fetch production data:", error);
        toast.error("Failed to load production data");

        // Fallback data for display when API fails
        setProductionData([
          {
            product_name: "TABLE",
            total_produced: 601,
            total_distributed: 50,
            remaining_stock: 551,
            stockPercentage: 92,
          },
          {
            product_name: "CHAIR",
            total_produced: 6760,
            total_distributed: 150,
            remaining_stock: 6610,
            stockPercentage: 98,
          },
          {
            product_name: "DOOR",
            total_produced: 50,
            total_distributed: 0,
            remaining_stock: 50,
            stockPercentage: 100,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductionData();
  }, []);

  // Calculate totals for the dashboard cards
  const totalProduced = productionData.reduce(
    (sum, item) => sum + item.total_produced,
    0
  );

  const totalDistributed = productionData.reduce(
    (sum, item) => sum + item.total_distributed,
    0
  );

  const totalRemaining = productionData.reduce(
    (sum, item) => sum + item.remaining_stock,
    0
  );

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
                value={totalDistributed.toLocaleString()}
                icon={<Truck />}
              />
              <Card
                title="Total Produced"
                value={totalProduced.toLocaleString()}
                icon={<Package />}
              />
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
            <ProductionChart />
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


        {/* Updated Product Stock section */}
        <section>
          <div className="py-6 px-4 rounded-sm shadow-md items-center">
            <h1 className="font-bold mb-2">Product Stock</h1>

            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                Loading product data...
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {productionData.map((product) => (
                  <div key={product.product_name} className="w-full">
                    <div className="flex justify-between">
                      <p>{product.product_name}</p>
                      <p>{product.remaining_stock.toLocaleString()}</p>
                      <p className="text-gray-500">
                        {product.stockPercentage}%
                      </p>
                    </div>
                    <Progress
                      color={(product.stockPercentage ?? 0) < 30 ? "red" : "green"}
                      value={product.stockPercentage ?? 0}
                      className="w-full"
                    />
                  </div>
                ))}

                {productionData.length === 0 && !isLoading && (
                  <div className="text-center text-gray-500 py-4">
                    No production data available
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="md:hidden">
          <div className="py-4 px-2 rounded-sm shadow-md items-center">
            {/* <WareHouseBarChart /> */}
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
