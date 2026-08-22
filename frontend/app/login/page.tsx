"use client";
import { ArrowLeft, Factory } from "lucide-react";
import { wareHouse } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col items-center gap-2 text-center mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25">
                <Factory className="h-5 w-5" />
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />
        <Image
          src={wareHouse.src}
          alt="Warehouse Image"
          height={500}
          width={500}
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-4">
            <h2 className="text-3xl font-bold">Welcome to ProTrack</h2>
            <p className="text-white/80 text-lg max-w-sm">
              Manage production, warehouses, and orders from one powerful dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
