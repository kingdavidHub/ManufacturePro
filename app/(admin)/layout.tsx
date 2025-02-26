import AdminLayout from "@/layouts/AdminLayout";
import { ChildrenProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const layout = ({ children }: ChildrenProps) => {
  return (
   <AdminLayout>
    {children}
   </AdminLayout>
  );
};
export default layout;
