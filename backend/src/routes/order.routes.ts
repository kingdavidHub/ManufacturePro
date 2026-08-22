import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import { authenticateUser, restrictTo } from '../middlewares/auth';
import catchAsync from '../utils/catchAsync';
import validate from '../middlewares/validate';
import { createOrderSchema, updateOrderStatusSchema, getOrdersSchema } from '../validations';

const router = Router();

router.use(catchAsync(authenticateUser));
router.use(catchAsync(restrictTo('SALES_REP')));

router.post('/', validate(createOrderSchema), catchAsync(orderController.createOrder));
router.patch('/:id/status', validate(updateOrderStatusSchema), catchAsync(orderController.updateOrderStatus));
router.get('/', validate(getOrdersSchema), catchAsync(orderController.getOrders));

export default router;
