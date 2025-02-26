import { CalendarDays, Folder, Truck } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <section>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start gap-1">
            <p>Welcome Back, David</p>
            <p>Get insights and manage revenue</p>
          </div>
          <div>Icon</div>
        </div>
      </section>

      <section>
        <div className="mx-auto">
          <div className="flex justify-between gap-4 shadow-md p-4 bg-white rounded-md">
            <Card title="Total Revenue" value="$10,000" icon={<Folder />} />
            <Card title="Total Orders" value="100" icon={<Truck />} />
            <Card title="Total Customers" value="1000" icon={<Truck />} />
            <Card title="Total Products" value="100" icon={<CalendarDays />} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Dashboard;

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
      <div className="border-r border-gray-400 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">{value}</div>
          <div className="text-gray-600">{icon}</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{title}</p>
      </div>
    </div>
  );
};
