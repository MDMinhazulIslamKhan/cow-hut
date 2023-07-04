import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middleware/validateRequest';
import { OrderValidation } from './order.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// cow order
router.post(
  '/',
  validateRequest(OrderValidation.createOrderZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.createOrder
);

// cow order history
router.get(
  '/all-orders',
  auth(ENUM_USER_ROLE.ADMIN),
  OrderController.getOrders
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  OrderController.getSingleOrder
);

export const OrderRouters = router;
