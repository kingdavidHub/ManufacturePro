import WareHouseChart from "@/components/WareHouseChart";
import WareHouseBarChart from "@/components/WareHouseBarChart";
import { CalendarDays, Circle, Folder, Truck } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  return (
    <>
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
            <WareHouseChart />
            <div className="flex flex-col gap-4 ml-4">
              <WarehouseContent
                color="#7E7E7E"
                fill="#7E7E7E"
                title="WareHouse A"
              />
              <WarehouseContent
                color="#363636"
                fill="#363636"
                title="WareHouse B"
              />
              <WarehouseContent
                color="#141414"
                fill="#141414"
                title="WareHouse C"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="py-6 px-4 rounded-sm shadow-md items-center">
            <h1 className="font-bold mb-2">Stock Levels</h1>

            <div className="flex flex-col gap-4">
              <div className="w-full">
                <div className="flex justify-between">
                  <p>Warehouse A</p>
                  <p>932</p>
                  <p className="text-gray-500">65%</p>
                </div>
                <Progress color="red" value={65} className="w-full" />
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <p>Warehouse B</p>
                  <p>452</p>
                  <p className="text-gray-500">20%</p>
                </div>
                <Progress color="red" value={45} className="w-full" />
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <p>Warehouse C</p>
                  <p>674</p>
                  <p className="text-gray-500">65%</p>
                </div>
                <Progress color="red" value={50} className="w-full" />
              </div>
            </div>
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


// we make it such that we check the number of products left after order made in a warehoiuse
// dyg?


export default Dashboard;

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
