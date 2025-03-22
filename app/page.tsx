import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Box, ClipboardList, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { report } from "@/assets";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 md:px-6">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Box className="h-6 w-6" />
            <span className="font-bold">ManufacturePro</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Streamline Your Manufacturing Operations
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Comprehensive record-keeping management system for efficient
                  production tracking, warehouse distribution, and order
                  fulfillment.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/login"}>
                  <Button>Get Started</Button>
                </Link>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <ClipboardList className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">
                  Daily Production Tracking
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Record and monitor the daily production of each product with
                  ease.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">
                  Warehouse Distribution
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage product distribution across three large warehouses
                  efficiently.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BarChart3 className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">
                  Reporting & Analytics
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Generate insightful reports for informed business decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                src={report.src}
                width={600}
                height={400}
                alt="Dashboard preview"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Centralized Solution for Your Business
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our web-based system provides a comprehensive solution for
                  tracking production, managing warehouse distribution, and
                  fulfilling customer orders. Make data-driven decisions with
                  real-time insights into inventory, order status, and product
                  demand.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href={"/login"}>
                    <Button className="inline-flex items-center justify-center">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ManufacturePro. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
