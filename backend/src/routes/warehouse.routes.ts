import { Router } from 'express';
import * as warehouseController from '../controllers/warehouse.controller';
import catchAsync from '../utils/catchAsync';
import { authenticateUser, restrictTo } from '../middlewares/auth';
import validate from '../middlewares/validate';
import {
  getWarehouseDashboardSchema,
  confirmDistributionSchema,
  getDistributionSchema,
  createWarehouseSchema,
} from '../validations';

const router = Router();

router.use(catchAsync(authenticateUser));
router.use(catchAsync(restrictTo('WAREHOUSE_MANAGER')));

router.get('/dashboard', validate(getWarehouseDashboardSchema), catchAsync(warehouseController.getWarehouseDashboard));
router.patch('/distributions/:distributionId', validate(confirmDistributionSchema), catchAsync(warehouseController.confirmDistribution));
router.get('/distributions/:distributionId', validate(getDistributionSchema), catchAsync(warehouseController.getDistribution));
router.post('/dashboard/create', validate(createWarehouseSchema), catchAsync(warehouseController.createWarehouse));

export default router;
