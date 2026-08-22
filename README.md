<div align="center">

# 🏭 ManufacturePro

**A full-stack production management platform for tracking manufacturing, warehouse distribution, and order fulfillment.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.21-green?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

[Live Demo](#) · [Report Bug](https://github.com/kingdavidHub/ManufacturePro/issues) · [Request Feature](https://github.com/kingdavidHub/ManufacturePro/issues)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Seeding Data](#seeding-data)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Author](#author)

---

## 🧐 About

ManufacturePro is a portfolio-grade production management system designed for furniture factories. It provides end-to-end visibility across the manufacturing pipeline — from raw production through warehouse distribution to final order fulfillment.

The platform supports three distinct roles (Production Manager, Warehouse Manager, Sales Representative), each with a tailored dashboard and permissions. Data flows from the factory floor through warehouses to customers, with real-time stock tracking at every stage.

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with role-based access control
- Three roles: **Production Manager**, **Warehouse Manager**, **Sales Representative**
- Demo credentials on the login page for easy portfolio walkthrough

### 📊 Production Management
- Record production batches (Table, Chair, Door) with quantities
- View production overview with aggregated totals
- Distribution dashboard showing stock movement per warehouse

### 🏗️ Warehouse Operations
- Track stock levels across 3 warehouses (SwiftStock, PrimeStorage, NextGen)
- Accept or reject incoming distributions from production
- View distribution history and current inventory

### 📦 Order Management
- Create and manage customer orders with product and quantity selection
- Real-time order status tracking (Pending → Successful)
- Paginated order views with status filtering

### 🎨 UI/UX
- Responsive design (mobile + desktop)
- Animated landing page with gradient visuals
- Skeleton loading placeholders for all data-fetching states
- Toast notifications for all user actions
- Collapsible sidebar navigation

### 🛡️ Backend
- Input validation with Zod on every endpoint
- Rate limiting (100 req/15min general, 20 req/15min auth)
- Global error handler for Mongoose, JWT, and validation errors
- 60-second request timeout for cold-start resilience

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with App Router |
| **TypeScript 5.7** | Type-safe development |
| **Tailwind CSS 4.0** | Utility-first styling |
| **shadcn/ui** | Pre-built UI components (Radix primitives) |
| **TanStack Table** | Powerful data tables with sorting/filtering |
| **Recharts** | Dashboard charts and visualizations |
| **React Hook Form + Zod** | Form validation |
| **Axios** | HTTP client with 60s timeout |
| **Sonner** | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| **Express.js** | HTTP server framework |
| **TypeScript 5.7** | Type-safe development |
| **MongoDB + Mongoose** | Database and ODM |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcrypt** | Password hashing |
| **Zod** | Request validation |
| **express-rate-limit** | API rate limiting |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend                           │
│  Next.js 15 (App Router)  ·  Tailwind CSS  ·  shadcn   │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ Landing  │  │  Login   │  │ Admin    │  │ Forms  │ │
│  │ Page     │  │  Page    │  │ Dashboards│  │        │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │  Axios (60s timeout)
                         ▼
┌─────────────────────────────────────────────────────────┐
│                      Backend                            │
│  Express.js  ·  TypeScript  ·  Rate Limiting            │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Auth    │  │Production│  │Warehouse │  │ Orders │ │
│  │ Routes   │  │ Routes   │  │ Routes   │  │ Routes │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘ │
│       │             │             │              │      │
│  ┌────▼─────────────▼─────────────▼──────────────▼────┐ │
│  │              Controllers + Validation              │ │
│  └────────────────────────┬───────────────────────────┘ │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              MongoDB (Mongoose ODM)                     │
│                                                         │
│  Users · Productions · Warehouses · Distributions · Orders│
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0
- **Yarn** ≥ 1.22
- **MongoDB Atlas** account (or local MongoDB instance)

### Installation

```bash
# Clone the repository
git clone https://github.com/kingdavidHub/ManufacturePro.git
cd ManufacturePro
```

#### Backend

```bash
cd backend
yarn install

# Create your .env file (see Environment Variables below)
cp .env.example .env

# Seed warehouses and users
yarn seed

# Seed production, distribution, and order data
yarn seed:data

# Start the dev server
yarn dev
```

The API runs at `http://localhost:3000`.

#### Frontend

```bash
cd frontend
yarn install

# Create your .env.local file (see Environment Variables below)
cp .env.example .env.local

# Start the dev server
yarn dev
```

The app runs at `http://localhost:3001`.

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/manufacturepro` |
| `JWT_SECRET` | Secret key for JWT signing | `your-super-secret-jwt-key` |
| `PORT` | Server port | `3000` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:3001` |

### Frontend (`frontend/.env.local`)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3000/api/v1` |

---

## 📡 API Reference

All endpoints are prefixed with `/api/v1`.

### Authentication

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/auth/register` | `{ email, password, role }` | Register a new user |
| `POST` | `/auth/login` | `{ email, password }` | Login and receive JWT |
| `GET` | `/auth/logout` | — | Logout (requires auth) |

### Production

| Method | Endpoint | Body / Query | Description |
|---|---|---|---|
| `POST` | `/productions` | `{ products: [{ product_name, product_amount }] }` | Record production batches |
| `POST` | `/productions/distribute` | `{ warehouse_name, distributions: [...] }` | Distribute products to warehouse |
| `GET` | `/productions` | — | Get all products with stock summary |
| `GET` | `/productions/dashboard` | — | Get production dashboard data |

### Warehouses

| Method | Endpoint | Body / Query | Description |
|---|---|---|---|
| `GET` | `/warehouses/dashboard` | `?status=&product=&page=&limit=` | Get warehouse dashboard |
| `POST` | `/warehouses/dashboard/create` | `{ name, location, capacity }` | Create a new warehouse |
| `GET` | `/warehouses/distributions/:id` | — | Get distribution details |
| `PATCH` | `/warehouses/distributions/:id` | `{ status: "SUCCESSFUL" \| "FAILED" }` | Update distribution status |

### Orders

| Method | Endpoint | Body / Query | Description |
|---|---|---|---|
| `POST` | `/orders` | `{ customerName, product, amount, warehouseName, ... }` | Create an order |
| `GET` | `/orders` | `?status=&page=&limit=` | Get paginated orders |
| `PATCH` | `/orders/:id/status` | `{ status: "SUCCESSFUL" }` | Update order status |

---

## 🗄 Database Schema

### Collections

**Users**
```
{ email, password (hashed), role, warehouseId? }
```

**Productions**
```
{ product (TABLE|CHAIR|DOOR), amount, date, timestamps }
```

**Warehouses**
```
{ name (SwiftStock|PrimeStorage|NextGen), location, capacity, timestamps }
```

**WarehouseDistributions**
```
{ productionId?, warehouseId, product, amount, status, distributedAt, timestamps }
```

**Orders**
```
{ customerName, customerAddress, product, amount, warehouseId, status, timestamps }
```

---

## 🌱 Seeding Data

The project includes two seed scripts:

```bash
# Seed warehouses + demo users (password: password123)
yarn seed

# Seed production batches, distributions, and orders
yarn seed:data
```

### Demo User Credentials

| Role | Email | Password |
|---|---|---|
| Production Manager | `production@factory.com` | `password123` |
| Warehouse Manager | `warehouse.swift@factory.com` | `password123` |
| Warehouse Manager | `warehouse.prime@factory.com` | `password123` |
| Warehouse Manager | `warehouse.nextgen@factory.com` | `password123` |
| Sales Representative | `sales@factory.com` | `password123` |

### Seeded Production Data

| Product | Total Units Produced |
|---|---|
| TABLE | 1,075 |
| CHAIR | 2,150 |
| DOOR | 535 |

Plus 23 warehouse distributions and 12 customer orders across 3 warehouses.

---

## 📂 Project Structure

```
ManufacturePro/
├── backend/
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── controllers/    # Route handlers
│   │   ├── middlewares/     # Auth, validation, rate limiting, error handling
│   │   ├── models/         # Mongoose schemas & models
│   │   ├── routes/         # Express route definitions
│   │   ├── types/          # TypeScript enums & interfaces
│   │   ├── utils/          # Helpers (AppError, catchAsync, JWT, response)
│   │   ├── validations/    # Zod schemas for all endpoints
│   │   ├── seed.ts         # Warehouse + user seeder
│   │   ├── seed-data.ts    # Production + distribution + order seeder
│   │   └── server.ts       # Express server entry point
│   ├── .env                # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── (admin)/        # Protected admin pages
│   │   │   ├── production/ # Production dashboards & forms
│   │   │   ├── sales/      # Order management
│   │   │   ├── warehouse/  # Warehouse management
│   │   │   └── deliveries/ # Delivery tracking
│   │   ├── login/          # Login page
│   │   ├── page.tsx        # Landing page
│   │   └── globals.css     # Global styles & animations
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── demo-credentials.tsx  # Demo login credentials panel
│   │   ├── UniqueDashboard.tsx   # Shared warehouse dashboard
│   │   ├── OrdersChart.tsx       # Orders visualization
│   │   └── ProductionChart.tsx   # Production visualization
│   ├── config/             # API endpoint configuration
│   ├── layouts/            # Admin layout with sidebar
│   ├── lib/                # Utilities & shared axios instance
│   └── types/              # TypeScript type definitions
│
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👤 Author

**Ugbayilola David**

- GitHub: [@kingdavidHub](https://github.com/kingdavidHub)
- Repository: [ManufacturePro](https://github.com/kingdavidHub/ManufacturePro)

---

<div align="center">

**Built with ❤️ as a portfolio project**

</div>
