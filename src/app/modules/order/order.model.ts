import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<IOrder, OrderModel>('Order', orderSchema);

export default Order;
