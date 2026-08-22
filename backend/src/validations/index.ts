import { z } from 'zod';
import { Role, ProductType, WarehouseName, WarehouseLocation, OrderStatus, DistributionStatus } from '../types';

// ── Auth ──────────────────────────────────────────────
export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.nativeEnum(Role),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
});

// ── Production ────────────────────────────────────────
const productItemSchema = z.object({
  product_name: z.nativeEnum(ProductType),
  product_amount: z.string().regex(/^\d+$/, 'product_amount must be a numeric string'),
});

export const createProductionSchema = z.object({
  body: z.object({
    products: z.array(productItemSchema).min(1, 'At least one product is required'),
  }),
});

const distributionItemSchema = z.object({
  product_name: z.nativeEnum(ProductType),
  amount: z.string().regex(/^\d+$/, 'amount must be a numeric string'),
});

export const distributeToWarehouseSchema = z.object({
  body: z.object({
    warehouse_name: z.nativeEnum(WarehouseName),
    distributions: z.array(distributionItemSchema).min(1, 'At least one distribution is required'),
  }),
});

// ── Order ─────────────────────────────────────────────
export const createOrderSchema = z.object({
  body: z.object({
    customerName: z.string().min(1, 'Customer name is required'),
    customerAddress: z.string().min(1, 'Customer address is required'),
    product: z.nativeEnum(ProductType),
    amount: z.number().int().positive('Amount must be a positive integer'),
    warehouseName: z.nativeEnum(WarehouseName),
  }),
});

export const updateOrderStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID'),
  }),
  body: z.object({
    status: z.nativeEnum(OrderStatus),
  }),
});

export const getOrdersSchema = z.object({
  query: z.object({
    status: z.nativeEnum(OrderStatus).optional(),
    warehouseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid warehouse ID').optional(),
    product: z.nativeEnum(ProductType).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
  }),
});

// ── Warehouse ─────────────────────────────────────────
export const confirmDistributionSchema = z.object({
  params: z.object({
    distributionId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid distribution ID'),
  }),
  body: z.object({
    status: z.nativeEnum(DistributionStatus),
  }),
});

export const getDistributionSchema = z.object({
  params: z.object({
    distributionId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid distribution ID'),
  }),
});

export const getWarehouseDashboardSchema = z.object({
  query: z.object({
    status: z.nativeEnum(DistributionStatus).optional(),
    product: z.nativeEnum(ProductType).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
  }),
});

export const createWarehouseSchema = z.object({
  body: z.object({
    name: z.nativeEnum(WarehouseName),
    location: z.nativeEnum(WarehouseLocation),
    capacity: z.number().int().positive('Capacity must be a positive integer'),
  }),
});
