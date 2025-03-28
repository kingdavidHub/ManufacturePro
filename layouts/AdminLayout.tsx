"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarGroup,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import { FaCartPlus } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { ChevronDown, Menu, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiApps2AddFill } from "react-icons/ri";
import { RoleProps } from "@/types";
import { getCookie, deleteCookie } from "cookies-next";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<RoleProps | null>(null);
  const [showRide, setShowRide] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userRole = getCookie("role") as RoleProps;
    setRole(userRole);
  }, []);

  const handleUserClick = () => {
    setShowUser((prev) => !prev);
  };

  const handleRideClick = () => {
    setShowRide((prev) => !prev);
  };

  const handleLogout = () => {
    try {
      // Remove cookies
      deleteCookie("token");
      deleteCookie("user");
      deleteCookie("role");

      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex ">
      {/* Sidebar */}
      <SidebarProvider className="hidden lg:block">
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
                    <Link
                      href={
                        role === "WAREHOUSE_MANAGER"
                          ? "/warehouse/dashboard"
                          : role === "PRODUCTION_MANAGER"
                          ? "/production/dashboard"
                          : "/sales/dashboard"
                      }
                      className="flex items-center gap-4"
                    >
                      <Menu />
                      <span className="text-sm">Dashboard</span>
                    </Link>
                  </div>
                  {role === "PRODUCTION_MANAGER" ? (
                    <>
                      <div>
                        <Link
                          href="/production/view"
                          className="flex items-center gap-4"
                        >
                          <MdProductionQuantityLimits size={20} />
                          <span className="text-sm">Products</span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/production/new"
                          className="flex items-center gap-4"
                        >
                          <RiApps2AddFill size={20} />
                          <span className="text-sm">New Products</span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/production/distribute"
                          className="flex items-center gap-4"
                        >
                          <RiApps2AddFill size={20} />
                          <span className="text-sm">Distribute Products</span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/production/production-dashboard"
                          className="flex items-center gap-4"
                        >
                          <RiApps2AddFill size={20} />
                          <span className="text-sm">Production Dashboard</span>
                        </Link>
                      </div>
                    </>
                  ) : null}
                  {role === "SALES_REP" ? (
                    <>
                      <div>
                        <Link
                          href="/sales/orders/view"
                          className="flex items-center gap-4"
                        >
                          <ShoppingCart />
                          <span className="text-sm">Orders</span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/sales/orders/new"
                          className="flex items-center gap-4"
                        >
                          <FaCartPlus size={20} />
                          <span className="text-sm">New Order</span>
                        </Link>
                      </div>
                    </>
                  ) : null}
                  {role === "WAREHOUSE_MANAGER" ? (
                    <>
                      {/* <div>
                        <Link
                          href="/warehouse/products"
                          className="flex items-center gap-4"
                        >
                          <ShoppingCart />
                          <span className="text-sm">Orders</span>
                        </Link>
                      </div> */}
                      <div>
                        <Link
                          href="/warehouse/new"
                          className="flex items-center gap-4"
                        >
                          <FaCartPlus size={20} />
                          <span className="text-sm">New Warehouse</span>
                        </Link>
                      </div>
                    </>
                  ) : null}
                  <div>
                    <Link
                      href="/deliveries"
                      className="flex items-center gap-4"
                    >
                      <Truck />
                      <span className="text-sm">Deliveries</span>
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
                      {role === "WAREHOUSE_MANAGER"
                        ? "Warehouse Manager"
                        : role === "SALES_REP"
                        ? "Sales Rep"
                        : "Admin"}
                    </p>
                  </div>
                  <div className="w-[20%]">
                    <LuLogOut
                      size={30}
                      color="#fff"
                      cursor="pointer"
                      onClick={handleLogout}
                    />
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </div>
        </Sidebar>
      </SidebarProvider>

      {/* Main Content */}
      <main className="w-full p-6">
        <section>
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Welcome Back, David</h2>
                <p className="text-sm text-muted-foreground">
                  Get insights and manage revenue
                </p>
              </div>
            </div>
            <div>
              <CgProfile size={40} />
            </div>
          </div>
        </section>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
