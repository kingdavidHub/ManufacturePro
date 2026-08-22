import { Router } from 'express';
import * as productionController from '../controllers/production.controller';
import catchAsync from '../utils/catchAsync';
import { authenticateUser, restrictTo } from '../middlewares/auth';
import validate from '../middlewares/validate';
import { createProductionSchema, distributeToWarehouseSchema } from '../validations';

const router = Router();

router.use(catchAsync(authenticateUser));
router.use(catchAsync(restrictTo('PRODUCTION_MANAGER')));

router.post('/', validate(createProductionSchema), catchAsync(productionController.createProduction));
router.post('/distribute', validate(distributeToWarehouseSchema), catchAsync(productionController.distributeToWarehouse));
router.get('/', catchAsync(productionController.getAllProducts));
router.get('/dashboard', catchAsync(productionController.getProductionDashboard));

export default router;
