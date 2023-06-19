import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middleware/validateRequest';
import { OrderValidation } from './order.validation';

const router = express.Router();

// cow order
router.post(
  '/',
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

// cow order history
router.get('/', OrderController.getOrders);

export const OrderRouters = router;
