import { Request, Response, NextFunction } from 'express';
import { Warehouse } from '../models/warehouse.model';
import { WarehouseDistribution } from '../models/warehouseDistribution.model';
import { User } from '../models/user.model';
import { DistributionStatus, ProductType } from '../types';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import responseHandler from '../utils/responseHandler';

export const confirmDistribution = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { distributionId } = req.params;
  const { status } = req.body;

  if (!Object.values(DistributionStatus).includes(status)) {
    return next(new AppError('Invalid distribution status', 400));
  }

  const distribution = await WarehouseDistribution.findById(distributionId);
  if (!distribution) {
    return next(new AppError('Distribution record not found', 404));
  }

  const updatedDistribution = await WarehouseDistribution.findByIdAndUpdate(
    distributionId,
    { status },
    { new: true }
  );

  responseHandler.success(res, 200, updatedDistribution);
});

export const getDistribution = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { distributionId } = req.params;
  const warehouseId = req.user?.warehouseId;

  const distribution = await WarehouseDistribution.findOne({
    _id: distributionId,
    warehouseId,
  }).populate('warehouseId');

  if (!distribution) {
    return next(new AppError('Distribution not found for this warehouse', 404));
  }

  const warehouse = distribution.warehouseId as any;

  responseHandler.success(res, 200, {
    id: distribution._id,
    product: distribution.product,
    amount: distribution.amount,
    status: distribution.status,
    distributedAt: distribution.distributedAt,
    warehouse_name: warehouse.name,
    warehouse_location: warehouse.location,
    createdAt: distribution.createdAt,
  });
});

export const getWarehouseDashboard = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const warehouseId = req.user?.warehouseId;
  const {
    status,
    product,
    startDate,
    endDate,
    page = '1',
    limit = '10',
  } = req.query as Record<string, string>;

  const filter: Record<string, any> = { warehouseId };

  if (status && Object.values(DistributionStatus).includes(status as DistributionStatus)) {
    filter.status = status;
  }
  if (product && Object.values(ProductType).includes(product as ProductType)) {
    filter.product = product;
  }
  if (startDate && endDate) {
    filter.distributedAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [distributions, totalCount] = await Promise.all([
    WarehouseDistribution.find(filter)
      .sort({ distributedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('warehouseId', 'name location'),
    WarehouseDistribution.countDocuments(filter),
  ]);

  const formattedDistributions = distributions.map((dist: any) => {
    const wh = dist.warehouseId as any;
    return {
      id: dist._id,
      product: dist.product,
      amount: dist.amount,
      status: dist.status,
      distributedAt: dist.distributedAt,
      warehouse_name: wh.name,
      warehouse_location: wh.location,
      createdAt: dist.createdAt,
    };
  });

  responseHandler.success(res, 200, {
    total: totalCount,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(totalCount / limitNum),
    distributions: formattedDistributions,
  });
});

export const createWarehouse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  const { name, location, capacity } = req.body;

  const warehouse = await Warehouse.create({
    name,
    location,
    capacity: parseInt(capacity),
  });

  if (userId) {
    await User.findByIdAndUpdate(userId, {
      warehouseId: warehouse._id,
    });
  }

  responseHandler.success(res, 201, warehouse);
});
