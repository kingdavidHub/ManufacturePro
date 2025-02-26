"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarGroup,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import { useContext, useState } from "react";
import {
  Home,
  LifeBuoy,
  CarFront,
  ChartSpline,
  FolderClosed,
  MessageSquare,
  UserCog,
  KeySquare,
  ChevronDown,
  CornerDownRight,
  Menu,
  ShoppingCart,
  Truck,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [showRide, setShowRide] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const handleUserClick = () => {
    setShowUser((prev) => !prev);
  };

  const handleRideClick = () => {
    setShowRide((prev) => !prev);
  };
  // className="bg-red-500"
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarProvider>
        <Sidebar>
          {/* Logo Section */}
          <div className="flex flex-col justify-between p-2 h-full ">
            {/* Main Navigation */}
            <SidebarContent>
              <SidebarGroup>
                <div className="flex items-start flex-col gap-4 ">
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold">ManufacturePro</span>
                  </div>
                  {/* Dashboard */}
                  <div>
                    <Link href="/dashboard" className="flex items-center gap-4">
                      <Menu />
                      <span className="text-sm">Dashboard</span>
                    </Link>
                  </div>
                  <div>
                    <Link href="/products" className="flex items-center gap-1">
                      <span className="text-sm">Products</span>
                    </Link>
                  </div>
                  <div>
                    <Link href="/reports" className="flex items-center gap-1">
                      <span className="text-sm">Reports</span>
                    </Link>
                  </div>
                  <div>
                    <Link href="/orders" className="flex items-center gap-4">
                      <ShoppingCart />
                      <span className="text-sm">Orders</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/deliveries"
                      className="flex items-center gap-4"
                    >
                      <Truck />
                      <span className="text-sm">Deliveries</span>
                    </Link>
                  </div>
                  <div>
                    <Link href="/settings" className="flex items-center gap-4">
                      <Settings />
                      <span className="text-sm">Settings</span>
                    </Link>
                  </div>
                </div>
              </SidebarGroup>
            </SidebarContent>
            {/* Footer Section */}
            <SidebarFooter>
              {/* fix colors not working */}
              <div>
                <div className="flex justify-between items-center gap-2 w-full ">
                  <div className="w-[20%]">
                    <CgProfile size={20} />
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-CustomBlack font-semibold ">
                      David Brown
                    </p>
                    <p className="text-sm text-CustomBlack font-semibold capitalize">
                      Warehouse Manager
                    </p>
                  </div>
                  <div className="w-[20%]">
                    <ChevronDown color="#fff" cursor="pointer" />
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </div>
        </Sidebar>
      </SidebarProvider>

      {/* Main Content */}
      <main className="w-full p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
