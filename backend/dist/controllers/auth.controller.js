"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const jwtHelperFn_1 = require("../utils/jwtHelperFn");
exports.register = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password, role } = req.body;
    const existingUser = await user_model_1.User.findOne({ email });
    if (existingUser) {
        return next(new appError_1.default('User already exists with this email', 400));
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 12);
    const newUser = await user_model_1.User.create({
        email,
        password: hashedPassword,
        role,
    });
    const token = (0, jwtHelperFn_1.signToken)(newUser.email);
    res.setHeader('Authorization', `Bearer ${token}`);
    responseHandler_1.default.success(res, 201, { role: newUser.role, token });
});
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await user_model_1.User.findOne({ email }).select('+password');
    if (!user) {
        return next(new appError_1.default('Invalid email or password', 401));
    }
    const validPassword = await bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        return next(new appError_1.default('Invalid email or password', 401));
    }
    const token = (0, jwtHelperFn_1.signToken)(user.email);
    res.setHeader('Authorization', `Bearer ${token}`);
    responseHandler_1.default.success(res, 200, { role: user.role, token });
});
exports.logout = (0, catchAsync_1.default)(async (_req, res, _next) => {
    res.setHeader('Authorization', '');
    responseHandler_1.default.success(res, 200, { message: 'Logged out successfully' });
});
//# sourceMappingURL=auth.controller.js.map