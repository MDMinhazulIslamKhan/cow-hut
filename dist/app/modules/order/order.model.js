'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const orderSchema = new mongoose_1.Schema(
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
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
