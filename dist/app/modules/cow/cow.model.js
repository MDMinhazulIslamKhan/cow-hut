'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const cow_constant_1 = require('./cow.constant');
const cowSchema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: cow_constant_1.cowLocation,
    },
    breed: {
      type: String,
      required: true,
      enum: cow_constant_1.cowBreed,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: cow_constant_1.cowLabel,
      default: 'sale',
    },
    category: {
      type: String,
      required: true,
      enum: cow_constant_1.cowCategory,
    },
    sellerId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Cow = (0, mongoose_1.model)('Cow', cowSchema);
exports.default = Cow;
