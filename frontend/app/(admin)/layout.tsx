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
      <nav className="lg:hidden bg-background border-b p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span>ProTrack</span>
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
