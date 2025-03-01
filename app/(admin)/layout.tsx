import AdminLayout from "@/layouts/AdminLayout";
import { ChildrenProps } from "@/types";
import { Menu } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const layout = ({ children }: ChildrenProps) => {
  return (
    <>
      {/* mobile nav menu */}
      <nav className="lg:hidden text-black bg-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">ManufacturePro</h1>
          <button>
            <Menu />
          </button>
        </div>
      </nav>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
};
export default layout;
