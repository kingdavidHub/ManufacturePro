"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductionDashboard = exports.getAllProducts = exports.distributeToWarehouse = exports.createProduction = void 0;
const production_model_1 = require("../models/production.model");
const warehouse_model_1 = require("../models/warehouse.model");
const warehouseDistribution_model_1 = require("../models/warehouseDistribution.model");
const types_1 = require("../types");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
exports.createProduction = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { products } = req.body;
    const productionEntries = await Promise.all(products.map((product) => production_model_1.Production.create({
        product: product.product_name,
        amount: parseInt(product.product_amount),
        date: new Date(),
    })));
    responseHandler_1.default.success(res, 201, productionEntries);
});
exports.distributeToWarehouse = (0, catchAsync_1.default)(async (req, res, next) => {
    const { warehouse_name, distributions } = req.body;
    const distributionResults = [];
    const warehouse = await warehouse_model_1.Warehouse.findOne({ name: warehouse_name });
    if (!warehouse) {
        throw new appError_1.default(`Warehouse ${warehouse_name} not found`, 404);
    }
    for (const dist of distributions) {
        const { product_name, amount } = dist;
        const totalProduced = await production_model_1.Production.aggregate([
            { $match: { product: product_name } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
        ]);
        const totalDistributed = await warehouseDistribution_model_1.WarehouseDistribution.aggregate([
            { $match: { product: product_name, status: 'SUCCESSFUL' } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
        ]);
        const produced = totalProduced.length > 0 ? (totalProduced[0].totalAmount ?? 0) : 0;
        const distributed = totalDistributed.length > 0 ? (totalDistributed[0].totalAmount ?? 0) : 0;
        const availableStock = produced - distributed;
        if (availableStock < parseInt(amount)) {
            throw new appError_1.default(`Not enough ${product_name} stock available (${availableStock} remaining)`, 400);
        }
        const distribution = await warehouseDistribution_model_1.WarehouseDistribution.create({
            warehouseId: warehouse._id,
            product: product_name,
            amount: parseInt(amount),
            status: 'PENDING',
            distributedAt: new Date(),
        });
        distributionResults.push(distribution);
    }
    responseHandler_1.default.success(res, 201, distributionResults);
});
exports.getAllProducts = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const productionSummary = await production_model_1.Production.aggregate([
        { $group: { _id: '$product', totalAmount: { $sum: '$amount' } } },
    ]);
    const distributionSummary = await warehouseDistribution_model_1.WarehouseDistribution.aggregate([
        { $match: { status: 'SUCCESSFUL' } },
        { $group: { _id: '$product', totalAmount: { $sum: '$amount' } } },
    ]);
    const productsData = Object.values(types_1.ProductType).map((product) => {
        const produced = productionSummary.find((p) => p._id === product)?.totalAmount || 0;
        const distributed = distributionSummary.find((d) => d._id === product)?.totalAmount || 0;
        return {
            product_name: product,
            total_produced: produced,
            total_distributed: distributed,
            remaining_stock: produced - distributed,
        };
    });
    responseHandler_1.default.success(res, 200, productsData);
});
exports.getProductionDashboard = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const warehouseDistribution = await warehouseDistribution_model_1.WarehouseDistribution.aggregate([
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
    const warehouses = await warehouse_model_1.Warehouse.find();
    const dashboardData = warehouses.map((warehouse) => {
        const warehouseDists = warehouseDistribution.filter((d) => d._id.warehouseId.toString() === warehouse._id.toString());
        const distributions = Object.values(types_1.ProductType).map((productName) => {
            const productDistributions = warehouseDists.filter((d) => d._id.product === productName);
            return {
                product_name: productName,
                status_summary: {
                    PENDING: {
                        total_amount: productDistributions.find((d) => d._id.status === 'PENDING')?.totalAmount || 0,
                        count: productDistributions.find((d) => d._id.status === 'PENDING')?.count || 0,
                    },
                    SUCCESSFUL: {
                        total_amount: productDistributions.find((d) => d._id.status === 'SUCCESSFUL')?.totalAmount || 0,
                        count: productDistributions.find((d) => d._id.status === 'SUCCESSFUL')?.count || 0,
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
    responseHandler_1.default.success(res, 200, dashboardData);
});
//# sourceMappingURL=production.controller.js.map