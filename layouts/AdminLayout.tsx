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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
                    <Link href="/dashboard" className="flex items-center gap-1">
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
                    <Link href="/orders" className="flex items-center gap-1">
                      <span className="text-sm">Orders</span>
                    </Link>
                  </div>
                  <div>
                    <Link href="/settings" className="flex items-center gap-1">
                      <span className="text-sm">Settings</span>
                    </Link>
                  </div>
                </div>
              </SidebarGroup>
            </SidebarContent>
            {/* Footer Section */}
            <SidebarFooter>
              <div className="flex flex-col gap-4">
                {/* fix colors not working */}
                <div>
                  <Link href="/login" className="flex items-center gap-1 ">
                    <div className="flex items-center gap-1 bg-white rounded-sm">
                      
                      <div className="flex flex-col">
                        <p className="text-sm text-CustomBlack font-semibold">
                          David Brown
                        </p>
                        <p className="text-sm text-CustomBlack font-semibold capitalize">
                          David Brown
                        </p>
                      </div>
                      <ChevronDown color="#67CA1B" cursor="pointer" />
                    </div>
                  </Link>
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
