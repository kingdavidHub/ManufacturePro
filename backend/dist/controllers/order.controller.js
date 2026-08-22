"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.updateOrderStatus = exports.createOrder = void 0;
const order_model_1 = require("../models/order.model");
const warehouse_model_1 = require("../models/warehouse.model");
const warehouseDistribution_model_1 = require("../models/warehouseDistribution.model");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
exports.createOrder = (0, catchAsync_1.default)(async (req, res, next) => {
    const { customerName, customerAddress, product, amount, warehouseName } = req.body;
    const warehouse = await warehouse_model_1.Warehouse.findOne({ name: warehouseName });
    if (!warehouse) {
        return next(new appError_1.default('Warehouse not found', 404));
    }
    const distributions = await warehouseDistribution_model_1.WarehouseDistribution.find({
        warehouseId: warehouse._id,
        product,
        status: 'SUCCESSFUL',
    });
    const orders = await order_model_1.Order.find({
        warehouseId: warehouse._id,
        product,
        status: 'SUCCESSFUL',
    });
    const totalReceived = distributions.reduce((sum, d) => sum + d.amount, 0);
    const totalFulfilled = orders.reduce((sum, o) => sum + o.amount, 0);
    const availableStock = totalReceived - totalFulfilled;
    if (availableStock < amount) {
        return next(new appError_1.default(`Insufficient ${product} stock in warehouse`, 400));
    }
    const order = await order_model_1.Order.create({
        customerName,
        customerAddress,
        product,
        amount,
        warehouseId: warehouse._id,
        status: 'PENDING',
    });
    const populatedOrder = await order.populate('warehouseId');
    responseHandler_1.default.success(res, 201, populatedOrder);
});
exports.updateOrderStatus = (0, catchAsync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = await order_model_1.Order.findById(id).populate('warehouseId');
    if (!order) {
        return next(new appError_1.default('Order not found', 404));
    }
    const validTransitions = {
        PENDING: ['SUCCESSFUL', 'FAILED'],
        SUCCESSFUL: [],
        FAILED: [],
    };
    if (!validTransitions[order.status].includes(status)) {
        return next(new appError_1.default('Invalid status transition', 400));
    }
    const updatedOrder = await order_model_1.Order.findByIdAndUpdate(id, { status }, { new: true });
    responseHandler_1.default.success(res, 200, updatedOrder);
});
exports.getOrders = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { status, warehouseId, product, startDate, endDate, page = '1', limit = '10' } = req.query;
    const filter = {};
    if (status)
        filter.status = status;
    if (warehouseId)
        filter.warehouseId = warehouseId;
    if (product)
        filter.product = product;
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
        order_model_1.Order.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .populate('warehouseId'),
        order_model_1.Order.countDocuments(filter),
    ]);
    responseHandler_1.default.success(res, 200, {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        orders,
    });
});
//# sourceMappingURL=order.controller.js.map