"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributionStatus = exports.OrderStatus = exports.WarehouseName = exports.WarehouseLocation = exports.ProductType = exports.Role = void 0;
var Role;
(function (Role) {
    Role["PRODUCTION_MANAGER"] = "PRODUCTION_MANAGER";
    Role["WAREHOUSE_MANAGER"] = "WAREHOUSE_MANAGER";
    Role["SALES_REP"] = "SALES_REP";
})(Role || (exports.Role = Role = {}));
var ProductType;
(function (ProductType) {
    ProductType["TABLE"] = "TABLE";
    ProductType["CHAIR"] = "CHAIR";
    ProductType["DOOR"] = "DOOR";
})(ProductType || (exports.ProductType = ProductType = {}));
var WarehouseLocation;
(function (WarehouseLocation) {
    WarehouseLocation["ILUPEJU"] = "ILUPEJU";
    WarehouseLocation["SANGO_TEDO"] = "SANGO_TEDO";
    WarehouseLocation["MOWE"] = "MOWE";
})(WarehouseLocation || (exports.WarehouseLocation = WarehouseLocation = {}));
var WarehouseName;
(function (WarehouseName) {
    WarehouseName["SwiftStock"] = "SwiftStock";
    WarehouseName["PrimeStorage"] = "PrimeStorage";
    WarehouseName["NextGen"] = "NextGen";
})(WarehouseName || (exports.WarehouseName = WarehouseName = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["SUCCESSFUL"] = "SUCCESSFUL";
    OrderStatus["FAILED"] = "FAILED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var DistributionStatus;
(function (DistributionStatus) {
    DistributionStatus["PENDING"] = "PENDING";
    DistributionStatus["SUCCESSFUL"] = "SUCCESSFUL";
    DistributionStatus["FAILED"] = "FAILED";
})(DistributionStatus || (exports.DistributionStatus = DistributionStatus = {}));
//# sourceMappingURL=index.js.map