import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Box,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  Globe,
  Layers,
  Lock,
  Package,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ClipboardCheck,
    title: "Daily Production Tracking",
    desc: "Record the number of each product manufactured daily with detailed metrics and quality control.",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Layers,
    title: "Warehouse Management",
    desc: "Log quantities of products distributed to each warehouse and maintain real-time inventory status.",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: Truck,
    title: "Order Tracking",
    desc: "Record customer orders including product types, quantities, and delivery details with live status updates.",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    desc: "Generate comprehensive reports on production, warehouse inventory, and customer orders.",
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: TrendingUp,
    title: "Business Insights",
    desc: "Provide actionable insights for restocking needs, high-demand products, and growth opportunities.",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    icon: Lock,
    title: "Role-Based Access",
    desc: "Secure multi-role system with Production, Warehouse, and Sales team access controls.",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
];

const steps = [
  {
    num: "01",
    icon: Factory,
    title: "Produce",
    desc: "Manufacture products and log daily production quantities with timestamps.",
    color: "bg-violet-500",
  },
  {
    num: "02",
    icon: Package,
    title: "Distribute",
    desc: "Allocate stock across warehouses with real-time inventory visibility.",
    color: "bg-cyan-500",
  },
  {
    num: "03",
    icon: Target,
    title: "Fulfill",
    desc: "Process customer orders and track delivery status from start to finish.",
    color: "bg-amber-500",
  },
  {
    num: "04",
    icon: Sparkles,
    title: "Analyze",
    desc: "Get actionable insights with powerful analytics and customizable dashboards.",
    color: "bg-emerald-500",
  },
];

const stats = [
  { value: "3", label: "Product Lines", icon: Box },
  { value: "3", label: "Warehouses", icon: Layers },
  { value: "3", label: "User Roles", icon: Users },
  { value: "100%", label: "Real-time", icon: Zap },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
              <Factory className="h-4 w-4" />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              ProTrack
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </Link>
            <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25">
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-violet-950/20 dark:via-background dark:to-cyan-950/20" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          {/* Floating orbs */}
          <div className="absolute top-20 left-[15%] h-72 w-72 rounded-full bg-violet-400/20 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-[10%] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-400/10 blur-3xl" />

          <div className="container relative px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="flex flex-col space-y-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm animate-fade-up">
                  <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                  <span>Production Management Reimagined</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl animate-fade-up" style={{ animationDelay: "100ms" }}>
                  Streamline Your{" "}
                  <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                    Manufacturing
                  </span>{" "}
                  &amp; Distribution
                </h1>
                <p className="max-w-lg text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "200ms" }}>
                  Track production, manage warehouse inventory, and fulfill customer orders — all from one powerful dashboard built for modern factories.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
                  <Link href="/login">
                    <Button size="lg" className="group bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white shadow-xl shadow-violet-500/25">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="border-2">
                      See How It Works
                    </Button>
                  </Link>
                </div>
                {/* Trust badges */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "400ms" }}>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Free for small teams
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Setup in minutes
                  </div>
                </div>
              </div>

              {/* Dashboard mockup */}
              <div className="hidden lg:block relative animate-fade-up" style={{ animationDelay: "200ms" }}>
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-cyan-500/20 rounded-2xl blur-2xl" />
                <div className="relative rounded-2xl border bg-background/95 backdrop-blur-sm shadow-2xl shadow-violet-500/10 overflow-hidden">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-xs font-medium text-muted-foreground">Dashboard Overview</span>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Stat cards */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { icon: TrendingUp, label: "Efficiency", value: "98%", gradient: "from-violet-500 to-purple-600" },
                        { icon: Box, label: "In Stock", value: "1,254", gradient: "from-cyan-500 to-blue-600" },
                        { icon: Truck, label: "Pending", value: "43", gradient: "from-amber-500 to-orange-600" },
                      ].map((stat) => (
                        <div key={stat.label} className="relative overflow-hidden rounded-xl border bg-background p-4">
                          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
                          <div className="relative">
                            <stat.icon className={`h-5 w-5 bg-gradient-to-r ${stat.gradient} bg-clip-text mb-2`} style={{ color: "hsl(var(--foreground))" }} />
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Progress bars */}
                    <div className="rounded-xl border bg-background p-4 space-y-4">
                      <h3 className="font-medium text-sm">Production by Product</h3>
                      {[
                        { name: "Tables", pct: 78, color: "bg-violet-500" },
                        { name: "Chairs", pct: 64, color: "bg-cyan-500" },
                        { name: "Doors", pct: 92, color: "bg-emerald-500" },
                      ].map((p) => (
                        <div key={p.name} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{p.name}</span>
                            <span className="font-medium">{p.pct}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div className={`h-full rounded-full ${p.color} transition-all`} style={{ width: `${p.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stats bar ─── */}
        <section className="border-y bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-4 py-6 md:py-8 px-4 md:px-8">
                  <div className="rounded-xl bg-violet-100 dark:bg-violet-950/40 p-2.5">
                    <s.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section id="features" className="w-full py-20 md:py-28 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 dark:bg-violet-950/40 px-4 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300">
                <Zap className="h-3.5 w-3.5" />
                Core Features
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                  Run Smarter
                </span>
              </h2>
              <p className="max-w-2xl text-muted-foreground text-lg">
                End-to-end tracking for manufacturing, distribution, and sales — built for teams that move fast.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group relative overflow-hidden rounded-2xl border bg-background p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${f.color} opacity-5 rounded-bl-full transition-all duration-300 group-hover:opacity-10 group-hover:scale-110`} />
                  <div className={`relative inline-flex rounded-xl ${f.bgColor} p-3 mb-4`}>
                    <f.icon className={`h-6 w-6 ${f.iconColor}`} />
                  </div>
                  <h3 className="relative text-xl font-bold mb-2">{f.title}</h3>
                  <p className="relative text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section id="how-it-works" className="w-full py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 dark:bg-cyan-950/40 px-4 py-1.5 text-sm font-medium text-cyan-700 dark:text-cyan-300">
                <Target className="h-3.5 w-3.5" />
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                From Production to{" "}
                <span className="bg-gradient-to-r from-cyan-500 to-violet-600 bg-clip-text text-transparent">
                  Delivery
                </span>
              </h2>
              <p className="max-w-2xl text-muted-foreground text-lg">
                A simple four-step flow that keeps your entire operation connected.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-violet-300 via-cyan-300 to-emerald-300 dark:from-violet-700 dark:via-cyan-700 dark:to-emerald-700" />
              {steps.map((step, i) => (
                <div key={step.num} className="relative flex flex-col items-center text-center group">
                  <div className="relative z-10 mb-6">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <step.icon className="h-7 w-7" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background border text-xs font-bold">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Benefits ─── */}
        <section id="benefits" className="w-full py-20 md:py-28 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-950/40 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    <Globe className="h-3.5 w-3.5" />
                    Why ProTrack
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Built for Modern{" "}
                    <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                      Manufacturers
                    </span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Stop juggling spreadsheets and disconnected tools. ProTrack gives your entire team a single source of truth.
                  </p>
                </div>
                <div className="grid gap-4">
                  {[
                    { icon: Zap, title: "Real-time Visibility", desc: "See production, inventory, and orders as they happen — no more guessing." },
                    { icon: Users, title: "Team Collaboration", desc: "Seamless communication between production, warehouse, and sales teams." },
                    { icon: TrendingUp, title: "Data-Driven Decisions", desc: "Make informed choices based on accurate, real-time analytics." },
                    { icon: Lock, title: "Enterprise Security", desc: "Role-based access controls keep your data safe and organized." },
                  ].map((b) => (
                    <div key={b.title} className="flex gap-4 rounded-xl border p-4 transition-all hover:bg-muted/50 hover:shadow-md">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/40">
                        <b.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-bold">{b.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Visual panel */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-2xl" />
                <div className="relative rounded-2xl border bg-background shadow-2xl shadow-emerald-500/10 overflow-hidden">
                  <div className="border-b bg-muted/50 px-6 py-4">
                    <h3 className="font-bold">Supply Chain Overview</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Flow diagram */}
                    <div className="flex items-center justify-between gap-2">
                      {[
                        { icon: Factory, label: "Factory", color: "bg-violet-500" },
                        { icon: Package, label: "Warehouse", color: "bg-cyan-500" },
                        { icon: Truck, label: "Delivery", color: "bg-amber-500" },
                        { icon: Target, label: "Customer", color: "bg-emerald-500" },
                      ].map((node, i) => (
                        <div key={node.label} className="flex items-center gap-2">
                          <div className="flex flex-col items-center gap-2">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${node.color} text-white`}>
                              <node.icon className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-medium text-muted-foreground">{node.label}</span>
                          </div>
                          {i < 3 && <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />}
                        </div>
                      ))}
                    </div>
                    {/* Mini table */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">Recent Activity</h4>
                      {[
                        { action: "120 Tables produced", time: "2 min ago", status: "success" },
                        { action: "SwiftStock received 40 Chairs", time: "15 min ago", status: "info" },
                        { action: "Order #1042 shipped", time: "1 hr ago", status: "success" },
                      ].map((a) => (
                        <div key={a.action} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full ${a.status === "success" ? "bg-emerald-500" : "bg-cyan-500"}`} />
                            <span className="text-sm">{a.action}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{a.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section id="contact" className="w-full py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Get Started Today
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-2xl">
                Ready to Transform Your Manufacturing?
              </h2>
              <p className="max-w-xl text-white/80 text-lg">
                Join teams that use ProTrack to streamline their production, inventory, and order management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-white text-violet-600 hover:bg-white/90 shadow-xl">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="w-full border-t bg-background">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                  <Factory className="h-4 w-4" />
                </div>
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">ProTrack</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                Comprehensive record-keeping system for manufacturing and distribution. Track production, inventory, and customer orders in real-time.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold">Product</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
                <Link href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Benefits</Link>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold">Legal</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
              </nav>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2025 ProTrack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
