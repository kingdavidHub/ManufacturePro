import { Request, Response, NextFunction } from 'express';
import { Production } from '../models/production.model';
import { Warehouse } from '../models/warehouse.model';
import { WarehouseDistribution } from '../models/warehouseDistribution.model';
import { ProductType } from '../types';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import responseHandler from '../utils/responseHandler';

interface AggregationResult {
  _id: string | null;
  totalAmount?: number;
  total?: number;
}

export const createProduction = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { products } = req.body;

  const productionEntries = await Promise.all(
    products.map((product: { product_name: string; product_amount: string }) =>
      Production.create({
        product: product.product_name,
        amount: parseInt(product.product_amount),
        date: new Date(),
      })
    )
  );

  responseHandler.success(res, 201, productionEntries);
});

export const distributeToWarehouse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { warehouse_name, distributions } = req.body;

  const distributionResults: any[] = [];

  const warehouse = await Warehouse.findOne({ name: warehouse_name });
  if (!warehouse) {
    throw new AppError(`Warehouse ${warehouse_name} not found`, 404);
  }

  for (const dist of distributions) {
    const { product_name, amount } = dist;

    const totalProduced = await Production.aggregate<AggregationResult>([
      { $match: { product: product_name } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
    ]);

    const totalDistributed = await WarehouseDistribution.aggregate<AggregationResult>([
      { $match: { product: product_name, status: 'SUCCESSFUL' } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
    ]);

    const produced = totalProduced.length > 0 ? (totalProduced[0].totalAmount ?? 0) : 0;
    const distributed = totalDistributed.length > 0 ? (totalDistributed[0].totalAmount ?? 0) : 0;
    const availableStock = produced - distributed;

    if (availableStock < parseInt(amount)) {
      throw new AppError(
        `Not enough ${product_name} stock available (${availableStock} remaining)`,
        400
      );
    }

    const distribution = await WarehouseDistribution.create({
      warehouseId: warehouse._id,
      product: product_name,
      amount: parseInt(amount),
      status: 'PENDING',
      distributedAt: new Date(),
    });

    distributionResults.push(distribution);
  }

  responseHandler.success(res, 201, distributionResults);
});

export const getAllProducts = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const productionSummary = await Production.aggregate<AggregationResult>([
    { $group: { _id: '$product', totalAmount: { $sum: '$amount' } } },
  ]);

  const distributionSummary = await WarehouseDistribution.aggregate<AggregationResult>([
    { $match: { status: 'SUCCESSFUL' } },
    { $group: { _id: '$product', totalAmount: { $sum: '$amount' } } },
  ]);

  const productsData = Object.values(ProductType).map((product: string) => {
    const produced = productionSummary.find((p: AggregationResult) => p._id === product)?.totalAmount || 0;
    const distributed = distributionSummary.find((d: AggregationResult) => d._id === product)?.totalAmount || 0;

    return {
      product_name: product,
      total_produced: produced,
      total_distributed: distributed,
      remaining_stock: produced - distributed,
    };
  });

  responseHandler.success(res, 200, productsData);
});

interface WarehouseDistAgg {
  _id: {
    warehouseId: string;
    product: string;
    status: string;
  };
  totalAmount: number;
  count: number;
}

export const getProductionDashboard = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const warehouseDistribution = await WarehouseDistribution.aggregate<WarehouseDistAgg>([
    {
      $group: {
        _id: {
          warehouseId: '$warehouseId',
          product: '$product',
          status: '$status',
        },
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
  ]);

  const warehouses = await Warehouse.find();

  const dashboardData = warehouses.map((warehouse: any) => {
    const warehouseDists = warehouseDistribution.filter(
      (d: WarehouseDistAgg) => d._id.warehouseId.toString() === warehouse._id.toString()
    );

    const distributions = Object.values(ProductType).map((productName: string) => {
      const productDistributions = warehouseDists.filter(
        (d: WarehouseDistAgg) => d._id.product === productName
      );

      return {
        product_name: productName,
        status_summary: {
          PENDING: {
            total_amount: productDistributions.find((d: WarehouseDistAgg) => d._id.status === 'PENDING')?.totalAmount || 0,
            count: productDistributions.find((d: WarehouseDistAgg) => d._id.status === 'PENDING')?.count || 0,
          },
          SUCCESSFUL: {
            total_amount: productDistributions.find((d: WarehouseDistAgg) => d._id.status === 'SUCCESSFUL')?.totalAmount || 0,
            count: productDistributions.find((d: WarehouseDistAgg) => d._id.status === 'SUCCESSFUL')?.count || 0,
          },
        },
      };
    });

    return {
      warehouse_id: warehouse._id,
      warehouse_name: warehouse.name,
      distributions,
    };
  });

  responseHandler.success(res, 200, dashboardData);
});
