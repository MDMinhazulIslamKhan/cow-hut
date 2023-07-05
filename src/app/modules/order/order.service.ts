import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { IOrder } from './order.interface';
import Order from './order.model';
import Cow from '../cow/cow.model';
import config from '../../../config';
import mongoose from 'mongoose';

const createOrder = async (
  token: string,
  password: string,
  cow: string
): Promise<IOrder | null> => {
  const userInfo = (await jwt.verify(
    token,
    config.jwt.secret as Secret
  )) as JwtPayload;
  const existingUser = await User.isUserExist(userInfo.phoneNumber);

  if (!existingUser) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User is deleted, create new account!!!'
    );
  }
  const isPasswordMatch = await User.isPasswordMatch(
    password,
    existingUser.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password didn't match!!!");
  }

  const existingCow = await Cow.findById(cow);

  if (!existingCow) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'There has no cow  with this cowId!!!'
    );
  }

  const user = await User.findById(existingUser.id);

  if (user?.budget && existingCow.price >= user?.budget) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You haven't enough money to bye this cow!!!"
    );
  }
  if (existingCow.label === 'sold out') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Cow is already sold!!!');
  }
  const session = await mongoose.startSession();

  let createdOrder;
  try {
    session.startTransaction();
    await Cow.findOneAndUpdate(
      { _id: cow },
      { label: 'sold out' },
      {
        session,
      }
    );

    await User.findOneAndUpdate(
      { _id: existingCow.sellerId },
      { $inc: { income: existingCow.price } },
      {
        session,
      }
    );
    await User.findOneAndUpdate(
      { _id: existingUser.id },
      { $inc: { budget: -existingCow.price } },
      {
        session,
      }
    );
    createdOrder = await Order.create([{ cow, buyer: existingUser.id }], {
      session,
    });

    if (!createdOrder) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order!');
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  const order = Order.findById(createdOrder[0].id)
    .populate({
      path: 'cow',
      model: 'Cow',
    })
    .populate({
      path: 'buyer',
      model: 'User',
    });

  return order;
};

const getOrders = async (): Promise<IOrder[] | null> => {
  const result = await Order.find();
  return result;
};
const getSingleOrder = async (id: string, token: string) => {
  const user = (await jwt.verify(
    token,
    config.jwt.secret as Secret
  )) as JwtPayload;
  const userInfo = await User.findOne({
    phoneNumber: user.phoneNumber,
  });

  const orderResult = await Order.findById(id).populate(['cow', 'buyer']);
  if (!orderResult) {
    throw new ApiError(httpStatus.CONFLICT, 'No order with this id!!!');
  }

  const cow = await Cow.findById(orderResult.cow);

  if (
    userInfo?.role !== 'admin' &&
    userInfo?.id !== orderResult?.buyer.id.toString() &&
    userInfo?.id !== cow?.sellerId.toString()
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!!!');
  }
  return orderResult;
};

export const OrderService = {
  createOrder,
  getOrders,
  getSingleOrder,
};
