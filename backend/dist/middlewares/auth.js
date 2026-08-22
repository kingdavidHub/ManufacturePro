"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.authenticateUser = void 0;
const user_model_1 = require("../models/user.model");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jwtHelperFn_1 = require("../utils/jwtHelperFn");
exports.authenticateUser = (0, catchAsync_1.default)(async (req, _res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new appError_1.default('You are not logged in! Please log in.', 401));
    }
    const decoded = (0, jwtHelperFn_1.verifyToken)(token);
    const currentUser = await user_model_1.User.findOne({ email: decoded.email }).select('+password');
    if (!currentUser) {
        return next(new appError_1.default('User belonging to this token no longer exists', 401));
    }
    req.user = currentUser;
    next();
});
const restrictTo = (...roles) => {
    return (req, _res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new appError_1.default('You do not have permission to perform this action', 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=auth.js.map