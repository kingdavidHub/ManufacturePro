import { Response } from 'express';
import AppError from './appError';
declare const responseHandler: {
    success: (res: Response, statusCode: number, data: any) => void;
    error: (res: Response, error: AppError) => void;
};
export default responseHandler;
//# sourceMappingURL=responseHandler.d.ts.map