import AdminLayout from "@/layouts/AdminLayout";
import { ChildrenProps } from "@/types";
import { Factory, Menu } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const layout = ({ children }: ChildrenProps) => {
  return (
    <>
      {/* mobile nav menu */}
      <nav className="lg:hidden bg-background/80 backdrop-blur-xl border-b p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
              <Factory className="h-3.5 w-3.5" />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              ProTrack
            </span>
          </div>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
};
export default layout;
