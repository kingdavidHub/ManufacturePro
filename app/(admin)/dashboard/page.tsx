import WareHouseChart from "@/components/WareHouseChart";
import { CalendarDays, Circle, Folder, Truck } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-6">
        <section>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1">
              <p>Welcome Back, David</p>
              <p>Get insights and manage revenue</p>
            </div>
            <div>
              <CgProfile size={40} />
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto">
            <div className="flex justify-between gap-4 shadow-md p-4 bg-white rounded-md">
              <Card title="Total Revenue" value="$10,000" icon={<Folder />} />
              <Card title="Total Orders" value="100" icon={<Truck />} />
              <Card title="Total Customers" value="1000" icon={<Truck />} />
              <div className="w-[20%]">
                <div className="p-4 ">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-semibold">100</div>
                    <div className="text-gray-600">
                      <CalendarDays />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Total Products</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
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
      </div>
    </>
  );
};
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
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="w-[20%]">
      <div className="border-r border-gray-400 p-4 ">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">{value}</div>
          <div className="text-gray-600">{icon}</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{title}</p>
      </div>
    </div>
  );
};
