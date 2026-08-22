import { ChildrenProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const layout = ({ children }: ChildrenProps) => {
  return <div>{children}</div>;
};
export default layout;
