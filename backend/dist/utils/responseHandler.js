"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler = {
    success: (res, statusCode, data) => {
        res.status(statusCode).json({
            status: 'success',
            data,
        });
    },
    error: (res, error) => {
        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message,
        });
    },
};
exports.default = responseHandler;
//# sourceMappingURL=responseHandler.js.map