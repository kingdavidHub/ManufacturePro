"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const production_routes_1 = __importDefault(require("./routes/production.routes"));
const warehouse_routes_1 = __importDefault(require("./routes/warehouse.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const responseHandler_1 = __importDefault(require("./utils/responseHandler"));
const appError_1 = __importDefault(require("./utils/appError"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
}));
app.get('/', (_req, res) => {
    responseHandler_1.default.success(res, 200, {
        message: 'Welcome to the Production Management API!',
    });
});
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/productions', production_routes_1.default);
app.use('/api/v1/warehouses', warehouse_routes_1.default);
app.use('/api/v1/orders', order_routes_1.default);
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    if (err instanceof appError_1.default) {
        responseHandler_1.default.error(res, err);
    }
    else {
        responseHandler_1.default.error(res, new appError_1.default(err.message || 'Internal Server Error', 500));
    }
});
const PORT = process.env.PORT || 3000;
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
exports.default = app;
//# sourceMappingURL=server.js.map