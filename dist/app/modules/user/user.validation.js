'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const user_constant_1 = require('./user.constant');
const createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string({
      required_error: 'password is required',
    }),
    role: zod_1.z.enum([...user_constant_1.userRoles], {
      required_error: 'role is required',
    }),
    name: zod_1.z.object({
      firstName: zod_1.z.string({
        required_error: 'firstName is required',
      }),
      lastName: zod_1.z.string({
        required_error: 'lastName is required',
      }),
    }),
    phoneNumber: zod_1.z.string({
      required_error: 'phoneNumber is required',
    }),
    address: zod_1.z.string({
      required_error: 'address is required',
    }),
    budget: zod_1.z.number().optional(),
    income: zod_1.z.number().optional(),
  }),
});
const updateUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    role: zod_1.z.enum([...user_constant_1.userRoles]).optional(),
    name: zod_1.z
      .object({
        firstName: zod_1.z.string({
          required_error: 'firstName is required',
        }),
        lastName: zod_1.z.string({
          required_error: 'lastName is required',
        }),
      })
      .optional(),
    phoneNumber: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    budget: zod_1.z.number().optional(),
    income: zod_1.z.number().optional(),
  }),
});
exports.UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
