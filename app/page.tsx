import Link from "next/link"
import { ArrowRight, BarChart3, Box, ClipboardCheck, Database, Layers, TrendingUp, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Database className="h-6 w-6 text-primary" />
            <span>ProTrack</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefits
            </Link>
            <Link href="#analytics" className="text-sm font-medium hover:text-primary transition-colors">
              Analytics
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign up
            </Button>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fade-up">
                    Streamline Your Manufacturing & Distribution
                  </h1>
                  <p
                    className="max-w-[600px] text-muted-foreground md:text-xl animate-fade-up"
                    style={{ animationDelay: "200ms" }}
                  >
                    Comprehensive record-keeping system that tracks production, inventory, and customer orders in
                    real-time.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-up"
                  style={{ animationDelay: "400ms" }}
                >
                  <Button size="lg" className="group">
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-lg blur-3xl opacity-50"></div>
                <div className="relative bg-background border rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="ml-2 text-sm font-medium">Dashboard Overview</div>
                    </div>
                  </div>
                  <div className="p-6 grid gap-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-primary/10 p-4 rounded-lg flex flex-col items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-primary mb-2" />
                        <div className="text-2xl font-bold">98%</div>
                        <div className="text-xs text-center">Production Efficiency</div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg flex flex-col items-center justify-center">
                        <Box className="h-8 w-8 text-primary mb-2" />
                        <div className="text-2xl font-bold">1,254</div>
                        <div className="text-xs text-center">Items in Stock</div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg flex flex-col items-center justify-center">
                        <Truck className="h-8 w-8 text-primary mb-2" />
                        <div className="text-2xl font-bold">43</div>
                        <div className="text-xs text-center">Pending Orders</div>
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Production Overview</h3>
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Product A</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Product B</span>
                          <span className="text-sm font-medium">64%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "64%" }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Product C</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Core Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Record-Keeping System</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our system provides end-to-end tracking for manufacturing and distribution processes
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-3">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Daily Production Tracking</h3>
                <p className="text-center text-muted-foreground">
                  Record the number of each product manufactured daily with detailed metrics and quality control.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-3">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Warehouse Management</h3>
                <p className="text-center text-muted-foreground">
                  Log quantities of products distributed to each warehouse and maintain real-time inventory status.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-3">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Customer Order Tracking</h3>
                <p className="text-center text-muted-foreground">
                  Record customer orders including product types, quantities, and delivery details with status updates.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Reporting & Analytics</h3>
                <p className="text-center text-muted-foreground">
                  Generate comprehensive reports on production, warehouse inventory, and customer orders.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Business Insights</h3>
                <p className="text-center text-muted-foreground">
                  Provide insights for business decisions, such as restocking needs and high-demand products.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-3">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Centralized Database</h3>
                <p className="text-center text-muted-foreground">
                  All your manufacturing and distribution data in one secure, accessible location.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="analytics" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                    Real-time Analytics
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Make Data-Driven Decisions
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our powerful analytics dashboard provides real-time insights into your manufacturing and
                    distribution processes.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <svg
                        className="h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">Production efficiency metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <svg
                        className="h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">Inventory forecasting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <svg
                        className="h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">Order fulfillment tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <svg
                        className="h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">Customizable reporting dashboards</span>
                  </li>
                </ul>
                <div>
                  <Button size="lg" className="group">
                    Explore Analytics
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-lg blur-3xl opacity-50"></div>
                <div className="relative w-full max-w-[500px] animate-float">
                  <div className="rounded-lg border bg-background shadow-xl overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Production Analytics</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-8">
                        <div>
                          <div className="flex justify-between mb-2">
                            <h4 className="text-sm font-medium">Monthly Production</h4>
                            <span className="text-sm text-green-500">+12.5%</span>
                          </div>
                          <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-end justify-between p-4 gap-2">
                            <div className="h-[40%] w-8 bg-primary/40 rounded-t-md"></div>
                            <div className="h-[60%] w-8 bg-primary/40 rounded-t-md"></div>
                            <div className="h-[80%] w-8 bg-primary/40 rounded-t-md"></div>
                            <div className="h-[50%] w-8 bg-primary/40 rounded-t-md"></div>
                            <div className="h-[70%] w-8 bg-primary/40 rounded-t-md"></div>
                            <div className="h-[90%] w-8 bg-primary rounded-t-md"></div>
                            <div className="h-[75%] w-8 bg-primary/40 rounded-t-md"></div>
                            <div className="h-[85%] w-8 bg-primary/40 rounded-t-md"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border p-4">
                            <div className="text-sm text-muted-foreground">Warehouse Utilization</div>
                            <div className="text-2xl font-bold mt-2">87%</div>
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: "87%" }}></div>
                            </div>
                          </div>
                          <div className="rounded-lg border p-4">
                            <div className="text-sm text-muted-foreground">Order Fulfillment</div>
                            <div className="text-2xl font-bold mt-2">94%</div>
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: "94%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Why Choose Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Transform Your Manufacturing Process
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our record-keeping system provides the insights you need to optimize your operations
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-full bg-primary/10 p-3 w-fit">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2v4" />
                      <path d="m6.8 6.8-2.8-2.8" />
                      <path d="M6 12H2" />
                      <path d="m6.8 17.2-2.8 2.8" />
                      <path d="M12 22v-4" />
                      <path d="m17.2 17.2 2.8 2.8" />
                      <path d="M22 12h-4" />
                      <path d="m17.2 6.8 2.8-2.8" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Increased Efficiency</h3>
                  <p className="text-muted-foreground">
                    Streamline your manufacturing process with real-time tracking and automated workflows.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-full bg-primary/10 p-3 w-fit">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Improved Collaboration</h3>
                  <p className="text-muted-foreground">
                    Enable seamless communication between production, warehouse, and sales teams.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-full bg-primary/10 p-3 w-fit">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Data-Driven Decisions</h3>
                  <p className="text-muted-foreground">
                    Make informed business decisions based on accurate, real-time data and analytics.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-full bg-primary/10 p-3 w-fit">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a1.93 1.93 0 0 0-.97 1.68v4.62a1.93 1.93 0 0 0 .97 1.68l3.65 1.89a1.93 1.93 0 0 0 1.81 0l2.75-1.43" />
                      <path d="M14.88 16.29a1.93 1.93 0 0 0-.97-1.68l-3.65-1.89a1.93 1.93 0 0 0-1.81 0L3.1 15.31a1.93 1.93 0 0 0-.97 1.68v4.62c0 .7.38 1.34.97 1.68l3.65 1.89a1.93 1.93 0 0 0 1.81 0l3.65-1.89c.59-.34.97-.98.97-1.68v-4.62Z" />
                      <path d="M20.91 15.31l-3.65-1.89a1.93 1.93 0 0 0-1.81 0l-3.65 1.89a1.93 1.93 0 0 0-.97 1.68v4.62c0 .7.38 1.34.97 1.68l3.65 1.89a1.93 1.93 0 0 0 1.81 0l3.65-1.89c.59-.34.97-.98.97-1.68v-4.62c0-.7-.38-1.34-.97-1.68Z" />
                      <path d="M7.5 4.12v5.87" />
                      <path d="M7.5 10v11" />
                      <path d="M13.5 14.12v6.88" />
                      <path d="M13.5 14.12v-2.37" />
                      <path d="m16.5 5.12 4.38 2.5" />
                      <path d="M20.91 8.84c0 1.93-1.5 3.5-3.34 3.5s-3.34-1.57-3.34-3.5 1.5-3.5 3.34-3.5 3.34 1.57 3.34 3.5Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Scalable Solution</h3>
                  <p className="text-muted-foreground">
                    Our system grows with your business, accommodating increasing products and warehouses.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-full bg-primary/10 p-3 w-fit">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Enhanced Security</h3>
                  <p className="text-muted-foreground">
                    Protect your valuable business data with enterprise-grade security and access controls.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-full bg-primary/10 p-3 w-fit">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Cost Reduction</h3>
                  <p className="text-muted-foreground">
                    Minimize waste and optimize inventory levels to reduce operational costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Get Started Today
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Transform Your Manufacturing?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Contact us today to schedule a demo and see how our record-keeping system can streamline your
                  operations.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" size="lg">
                  Request a Demo
                </Button>
                <Button className="w-full" variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Database className="h-6 w-6 text-primary" />
                <span>ProTrack</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Comprehensive record-keeping system for manufacturing and distribution. Track production, inventory, and
                customer orders in real-time.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <h3 className="text-lg font-medium">Company</h3>
                <nav className="grid gap-2">
                  <Link href="#" className="text-sm hover:underline">
                    About
                  </Link>
                  <Link href="#" className="text-sm hover:underline">
                    Careers
                  </Link>
                  <Link href="#" className="text-sm hover:underline">
                    Contact
                  </Link>
                </nav>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-medium">Legal</h3>
                <nav className="grid gap-2">
                  <Link href="#" className="text-sm hover:underline">
                    Terms
                  </Link>
                  <Link href="#" className="text-sm hover:underline">
                    Privacy
                  </Link>
                  <Link href="#" className="text-sm hover:underline">
                    Cookies
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col gap-4 md:flex-row md:justify-between">
            <p className="text-sm text-muted-foreground">© 2025 ProTrack. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

