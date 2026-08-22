"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWarehouse = exports.getWarehouseDashboard = exports.getDistribution = exports.confirmDistribution = void 0;
const warehouse_model_1 = require("../models/warehouse.model");
const warehouseDistribution_model_1 = require("../models/warehouseDistribution.model");
const user_model_1 = require("../models/user.model");
const types_1 = require("../types");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
exports.confirmDistribution = (0, catchAsync_1.default)(async (req, res, next) => {
    const { distributionId } = req.params;
    const { status } = req.body;
    if (!Object.values(types_1.DistributionStatus).includes(status)) {
        return next(new appError_1.default('Invalid distribution status', 400));
    }
    const distribution = await warehouseDistribution_model_1.WarehouseDistribution.findById(distributionId);
    if (!distribution) {
        return next(new appError_1.default('Distribution record not found', 404));
    }
    const updatedDistribution = await warehouseDistribution_model_1.WarehouseDistribution.findByIdAndUpdate(distributionId, { status }, { new: true });
    responseHandler_1.default.success(res, 200, updatedDistribution);
});
exports.getDistribution = (0, catchAsync_1.default)(async (req, res, next) => {
    const { distributionId } = req.params;
    const warehouseId = req.user?.warehouseId;
    const distribution = await warehouseDistribution_model_1.WarehouseDistribution.findOne({
        _id: distributionId,
        warehouseId,
    }).populate('warehouseId');
    if (!distribution) {
        return next(new appError_1.default('Distribution not found for this warehouse', 404));
    }
    const warehouse = distribution.warehouseId;
    responseHandler_1.default.success(res, 200, {
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
exports.getWarehouseDashboard = (0, catchAsync_1.default)(async (req, res, _next) => {
    const warehouseId = req.user?.warehouseId;
    const { status, product, startDate, endDate, page = '1', limit = '10', } = req.query;
    const filter = { warehouseId };
    if (status && Object.values(types_1.DistributionStatus).includes(status)) {
        filter.status = status;
    }
    if (product && Object.values(types_1.ProductType).includes(product)) {
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
        warehouseDistribution_model_1.WarehouseDistribution.find(filter)
            .sort({ distributedAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .populate('warehouseId', 'name location'),
        warehouseDistribution_model_1.WarehouseDistribution.countDocuments(filter),
    ]);
    const formattedDistributions = distributions.map((dist) => {
        const wh = dist.warehouseId;
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
    responseHandler_1.default.success(res, 200, {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalCount / limitNum),
        distributions: formattedDistributions,
    });
});
exports.createWarehouse = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.user?.id;
    const { name, location, capacity } = req.body;
    const warehouse = await warehouse_model_1.Warehouse.create({
        name,
        location,
        capacity: parseInt(capacity),
    });
    if (userId) {
        await user_model_1.User.findByIdAndUpdate(userId, {
            warehouseId: warehouse._id,
        });
    }
    responseHandler_1.default.success(res, 201, warehouse);
});
//# sourceMappingURL=warehouse.controller.js.map