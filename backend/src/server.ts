import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import productionRoutes from './routes/production.routes';
import warehouseRoutes from './routes/warehouse.routes';
import orderRoutes from './routes/order.routes';
import errorHandler from './middlewares/errorHandler';
import responseHandler from './utils/responseHandler';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  })
);

app.get('/', (_req: Request, res: Response) => {
  responseHandler.success(res, 200, {
    message: 'Welcome to the Production Management API!',
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/productions', productionRoutes);
app.use('/api/v1/warehouses', warehouseRoutes);
app.use('/api/v1/orders', orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
