"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarGroup,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import {
  Factory,
  LayoutDashboard,
  Package,
  PlusCircle,
  Share2,
  BarChart3,
  ShoppingCart,
  Plus,
  Truck,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { RoleProps } from "@/types";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const NavLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
}) => (
  <Link
    href={href}
    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
  >
    <Icon className="h-4 w-4" />
    <span className="flex-1">{label}</span>
  </Link>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<RoleProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userRole = getCookie("role") as RoleProps;
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    try {
      deleteCookie("token");
      deleteCookie("user");
      deleteCookie("role");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const dashboardHref =
    role === "WAREHOUSE_MANAGER"
      ? "/warehouse/dashboard"
      : role === "PRODUCTION_MANAGER"
        ? "/production/dashboard"
        : "/sales/dashboard";

  const roleLabel =
    role === "WAREHOUSE_MANAGER"
      ? "Warehouse Manager"
      : role === "SALES_REP"
        ? "Sales Rep"
        : role === "PRODUCTION_MANAGER"
          ? "Production Manager"
          : "Admin";

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarProvider className="hidden lg:block">
        <Sidebar>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-4 border-b">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Factory className="h-4 w-4" />
                </div>
                <span className="font-bold text-lg">
                  ProTrack
                </span>
              </Link>
            </div>

            {/* Nav */}
            <SidebarContent>
              <SidebarGroup>
                <nav className="flex flex-col gap-1 px-2 py-4">
                  <NavLink href={dashboardHref} icon={LayoutDashboard} label="Dashboard" />

                  {role === "PRODUCTION_MANAGER" && (
                    <>
                      <div className="mt-4 mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Production
                      </div>
                      <NavLink href="/production/view" icon={Package} label="Products" />
                      <NavLink href="/production/new" icon={PlusCircle} label="New Products" />
                      <NavLink href="/production/distribute" icon={Share2} label="Distribute" />
                      <NavLink href="/production/production-dashboard" icon={BarChart3} label="Production Dashboard" />
                    </>
                  )}

                  {role === "SALES_REP" && (
                    <>
                      <div className="mt-4 mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Sales
                      </div>
                      <NavLink href="/sales/orders/view" icon={ShoppingCart} label="Orders" />
                      <NavLink href="/sales/orders/new" icon={Plus} label="New Order" />
                    </>
                  )}

                  {role === "WAREHOUSE_MANAGER" && (
                    <>
                      <div className="mt-4 mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Warehouse
                      </div>
                      <NavLink href="/warehouse/new" icon={PlusCircle} label="New Warehouse" />
                    </>
                  )}

                  <div className="mt-4 mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Operations
                  </div>
                  <NavLink href="/deliveries" icon={Truck} label="Deliveries" />
                </nav>
              </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">David Brown</p>
                  <p className="text-xs text-muted-foreground capitalize">{roleLabel}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </SidebarFooter>
          </div>
        </Sidebar>
      </SidebarProvider>

      {/* Main Content */}
      <main className="w-full min-h-screen bg-muted/30">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background border-b">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-lg font-semibold">
                Welcome back, David 👋
              </h2>
              <p className="text-sm text-muted-foreground">
                Here&apos;s what&apos;s happening today
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              DB
            </div>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
