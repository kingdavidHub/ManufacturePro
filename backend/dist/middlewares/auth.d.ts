import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
export declare const authenticateUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const restrictTo: (...roles: string[]) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map