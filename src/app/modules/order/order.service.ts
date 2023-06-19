import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { IOrder } from './order.interface';
import Order from './order.model';
import Cow from '../cow/cow.model';

const createOrder = async (
  phoneNumber: string,
  password: string,
  cow: string
): Promise<IOrder | null> => {
  const existingUser = await User.findOne({ phoneNumber });

  if (!existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'No user with this phon number!!!');
  }
  const existingCow = await Cow.findById(cow);

  if (!existingCow) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'There has no cow  with this cowId!!!'
    );
  }
  // password matching
  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password didn't match!!!");
  }
  if (existingCow.price >= existingUser.budget) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You haven't enough money to bye this cow!!!"
    );
  }

  if (existingCow.label === 'sold out') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Cow is already sold!!!');
  }
  const createdOrder = await Order.create({ cow, buyer: existingUser.id });
  await Cow.findOneAndUpdate({ _id: cow }, { label: 'sold out' });
  await User.findOneAndUpdate(
    { _id: existingCow.sellerId },
    { $inc: { income: existingCow.price } }
  );
  await User.findOneAndUpdate(
    { _id: existingUser.id },
    { $inc: { budget: -existingCow.price } }
  );

  if (!createdOrder) {
    throw new ApiError(400, 'Failed to create order!');
  }
  return createdOrder;
};

const getOrders = async (): Promise<IOrder[] | null> => {
  const result = await Order.find();
  return result;
};

export const OrderService = {
  createOrder,
  getOrders,
};
