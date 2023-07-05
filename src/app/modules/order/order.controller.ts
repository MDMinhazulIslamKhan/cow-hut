import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { OrderService } from './order.service';

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, cow } = req.body;
    const token = req?.headers?.authorization as string;

    const result = await OrderService.createOrder(token, password, cow);

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

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const token = req?.headers?.authorization as string;

  const result = await OrderService.getSingleOrder(id, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved Successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getOrders,
  getSingleOrder,
};
