import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/order.model';
import { Warehouse } from '../models/warehouse.model';
import { WarehouseDistribution } from '../models/warehouseDistribution.model';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import responseHandler from '../utils/responseHandler';

export const createOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { customerName, customerAddress, product, amount, warehouseName } = req.body;

  const warehouse = await Warehouse.findOne({ name: warehouseName });
  if (!warehouse) {
    return next(new AppError('Warehouse not found', 404));
  }

  const distributions = await WarehouseDistribution.find({
    warehouseId: warehouse._id,
    product,
    status: 'SUCCESSFUL',
  });

  const orders = await Order.find({
    warehouseId: warehouse._id,
    product,
    status: 'SUCCESSFUL',
  });

  const totalReceived = distributions.reduce((sum: number, d) => sum + d.amount, 0);
  const totalFulfilled = orders.reduce((sum: number, o) => sum + o.amount, 0);
  const availableStock = totalReceived - totalFulfilled;

  if (availableStock < amount) {
    return next(new AppError(`Insufficient ${product} stock in warehouse`, 400));
  }

  const order = await Order.create({
    customerName,
    customerAddress,
    product,
    amount,
    warehouseId: warehouse._id,
    status: 'PENDING',
  });

  const populatedOrder = await order.populate('warehouseId');

  responseHandler.success(res, 201, populatedOrder);
});

export const updateOrderStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id).populate('warehouseId');
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  const validTransitions: Record<string, string[]> = {
    PENDING: ['SUCCESSFUL', 'FAILED'],
    SUCCESSFUL: [],
    FAILED: [],
  };

  if (!validTransitions[order.status].includes(status)) {
    return next(new AppError('Invalid status transition', 400));
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  responseHandler.success(res, 200, updatedOrder);
});

export const getOrders = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { status, warehouseId, product, startDate, endDate, page = '1', limit = '10' } = req.query as Record<string, string>;

  const filter: Record<string, any> = {};
  if (status) filter.status = status;
  if (warehouseId) filter.warehouseId = warehouseId;
  if (product) filter.product = product;
  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('warehouseId'),
    Order.countDocuments(filter),
  ]);

  responseHandler.success(res, 200, {
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
    orders,
  });
});
