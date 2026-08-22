# Factory Distribution Registry

A comprehensive production and warehouse management API system for tracking furniture manufacturing, warehouse distribution, and order fulfillment.

## 📋 Overview

The Factory Distribution Registry is a RESTful API built with Node.js and Express that manages the complete lifecycle of furniture production, warehouse distribution, and customer orders. The system supports three main product types (Tables, Chairs, and Doors) across multiple warehouse locations.

## 🚀 Features

- **Authentication & Authorization**: Role-based access control with JWT tokens
- **Production Management**: Track production batches and quantities
- **Warehouse Management**: Manage multiple warehouses with capacity tracking
- **Distribution Tracking**: Monitor product distribution from production to warehouses
- **Order Management**: Process and track customer orders
- **Multi-role Support**: Production Managers, Warehouse Managers, and Sales Representatives

## 🏗️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **CORS**: Enabled for cross-origin requests

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd factory-distro-registry
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/factory_db"
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=*
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**

   ```bash
   npm run build
   ```

6. **Start the server**

   Development mode:

   ```bash
   npm run dev
   ```

   Production mode:

   ```bash
   npm start
   ```

The server will start on `http://localhost:3000` (or your specified PORT).

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "PRODUCTION_MANAGER",
  "warehouseId": "optional-warehouse-id"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Production Endpoints

All production endpoints require authentication.

```http
GET    /productions          # Get all productions
POST   /productions          # Create new production
GET    /productions/:id      # Get production by ID
PUT    /productions/:id      # Update production
DELETE /productions/:id      # Delete production
```

### Warehouse Endpoints

```http
GET    /warehouses           # Get all warehouses
POST   /warehouses           # Create new warehouse
GET    /warehouses/:id       # Get warehouse by ID
PUT    /warehouses/:id       # Update warehouse
DELETE /warehouses/:id       # Delete warehouse
```

### Order Endpoints

```http
GET    /orders               # Get all orders
POST   /orders               # Create new order
GET    /orders/:id           # Get order by ID
PUT    /orders/:id           # Update order
DELETE /orders/:id           # Delete order
```

## 🗂️ Data Models

### User Roles

- `PRODUCTION_MANAGER` - Manages production operations
- `WAREHOUSE_MANAGER` - Manages warehouse operations
- `SALES_REP` - Handles customer orders

### Product Types

- `TABLE`
- `CHAIR`
- `DOOR`

### Warehouse Locations

- `ILUPEJU`
- `SANGO_TEDO`
- `MOWE`

### Warehouse Names

- `SwiftStock`
- `PrimeStorage`
- `NextGen`

### Order Status

- `PENDING`
- `SUCCESSFUL`
- `FAILED`

### Distribution Status

- `PENDING`
- `SUCCESSFUL`
- `FAILED`

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

## 📁 Project Structure

```
factory-distro-registry/
├── controllers/          # Request handlers
│   ├── auth.controller.js
│   ├── order.controller.js
│   ├── production.controller.js
│   └── warehouse.controller.js
├── middlewares/          # Custom middleware
│   └── auth.js
├── routes/              # API routes
│   ├── auth.routes.js
│   ├── order.routes.js
│   ├── production.routes.js
│   └── warehouse.routes.js
├── prisma/              # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── utils/               # Helper functions
│   ├── appError.js
│   ├── catchAsync.js
│   ├── jwtHelperFn.js
│   └── responseHandler.js
├── docs/                # Documentation
├── server.js            # Application entry point
└── package.json         # Dependencies and scripts
```

## 🛠️ Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Generate Prisma Client
- `npm test` - Run tests (to be implemented)

## 🗄️ Database Schema

The application uses the following main models:

- **User**: User accounts with role-based access
- **Production**: Production batch records
- **Warehouse**: Warehouse locations and capacity
- **WarehouseDistribution**: Distribution records from production to warehouses
- **Order**: Customer orders linked to warehouses

## 📝 Environment Variables

| Variable         | Description                  | Default  |
| ---------------- | ---------------------------- | -------- |
| `DATABASE_URL`   | PostgreSQL connection string | Required |
| `PORT`           | Server port                  | 3000     |
| `JWT_SECRET`     | Secret key for JWT signing   | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time    | 7d       |
| `CORS_ORIGIN`    | Allowed CORS origins         | \*       |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- **JUMO** - Developer
- **COSMO-SAM** - Developer

## 📄 License

This project is licensed under the ISC License.

## 🔧 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Verify DATABASE_URL in `.env` file
- Check database credentials and permissions

### Migration Errors

```bash
npx prisma migrate reset  # Reset database (caution: deletes all data)
npx prisma migrate dev    # Run migrations
```

### Port Already in Use

Change the PORT in your `.env` file or stop the process using the port:

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Note**: This is a production management system. Ensure proper security measures are in place before deploying to production, including secure JWT secrets, HTTPS, and database security configurations.
