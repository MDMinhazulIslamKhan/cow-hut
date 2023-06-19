import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    cow: {
      type: String,
      required: true,
    },
    buyer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<IOrder, OrderModel>('Order', orderSchema);

export default Order;
