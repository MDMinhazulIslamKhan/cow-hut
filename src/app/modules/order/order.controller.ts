import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { OrderService } from './order.service';

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { phoneNumber, password, cow } = req.body;

    const result = await OrderService.createOrder(phoneNumber, password, cow);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Order created Successfully.',
    });
  }
);
const getOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getOrders();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Orders retrieved successfully.',
    });
  }
);

export const OrderController = {
  createOrder,
  getOrders,
};
