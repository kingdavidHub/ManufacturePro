import { Request, Response, NextFunction } from 'express';
type AsyncFn = (req: Request, res: Response, next: NextFunction) => void | Promise<any>;
declare const catchAsync: (fn: AsyncFn) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map