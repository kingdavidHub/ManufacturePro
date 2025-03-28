"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios"; // Import AxiosError
import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { toast } from "sonner";
import { RoleProps } from "@/types";

type FormData = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    setLoading(true);

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (result.status === 200) {
        const { token, role } = result.data.data;

        // Set cookies
        setCookie("token", token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
        setCookie("role", role, { maxAge: 30 * 24 * 60 * 60, path: "/" });

        toast.success("Login successful");

        if (role === "WAREHOUSE_MANAGER") {
          router.push("/warehouse/dashboard");
        } else if (role === "SALES_REP") {
          router.push("/sales/dashboard");
        } else if (role === "PRODUCTION_MANAGER") {
          router.push("/production/dashboard");
        }
      }
    } catch (error: unknown) {
      // Use unknown instead of any and then check type
      let errorMsg = "Login failed";

      if (axios.isAxiosError(error)) {
        // Now TypeScript knows this is an AxiosError
        errorMsg = error.response?.data?.message || "Login failed";
      }

      toast.error(errorMsg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          {loading ? <PacmanLoader color="#fff" size={10} /> : "Login"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
