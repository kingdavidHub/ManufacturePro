import WareHouseChart from "@/components/WareHouseChart";
import WareHouseBarChart from "@/components/WareHouseBarChart";
import { CalendarDays, Circle, Folder, Truck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const UniqueDashboard = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-6">
        <section>
          <div className="mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <div className="md:w-[25%] rounded-xl border bg-background p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="flex flex-col-reverse md:flex-col items-center md:items-start justify-between gap-2">
                  <div className="flex flex-col-reverse md:flex-row items-center w-full justify-between gap-1">
                    <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                      21/04<span className="hidden md:block">/2025</span>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                  </div>
                  <h2 className="text-xs font-medium text-muted-foreground mt-1 text-center md:text-left w-full">
                    Next Shipment
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hidden md:block">
          <div className="flex py-4 px-4 rounded-xl border bg-background items-center">
            <WareHouseChart />
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

        <section>
          <div className="rounded-xl border bg-background p-6">
            <h1 className="font-bold mb-2">Stock Levels</h1>

            <div className="flex flex-col gap-4">
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium">NextGen</p>
                  <p className="text-sm">932</p>
                  <p className="text-sm text-muted-foreground">65%</p>
                </div>
                <Progress color="red" value={65} className="w-full" />
              </div>
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium">SwiftStock</p>
                  <p className="text-sm">452</p>
                  <p className="text-sm text-muted-foreground">20%</p>
                </div>
                <Progress color="red" value={45} className="w-full" />
              </div>
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium">PrimeStorage</p>
                  <p className="text-sm">252</p>
                  <p className="text-sm text-muted-foreground">20%</p>
                </div>
                <Progress color="red" value={45} className="w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="md:hidden">
          <div className="py-4 px-4 rounded-xl border bg-background">
            <WareHouseBarChart />
          </div>
        </section>
      </div>
    </>
  )
}
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
      className={`${newClass} md:w-[25%] rounded-xl border bg-background p-4 transition-all hover:shadow-md hover:-translate-y-0.5`}
    >
      <div className="flex flex-col-reverse md:flex-col items-center md:items-start justify-between gap-2">
        <div className="flex flex-col-reverse md:flex-row items-center w-full justify-between gap-1">
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            {value}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400">
            {icon}
          </div>
        </div>
        <h2 className="text-xs font-medium text-muted-foreground mt-1 text-center md:text-left w-full">
          {title}
        </h2>
      </div>
    </div>
  );
};