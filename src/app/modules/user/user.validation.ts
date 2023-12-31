import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.enum(['seller', 'buyer'], {
      required_error: 'role is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      lastName: z.string({
        required_error: 'lastName is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum(['seller', 'buyer']).optional(),
    name: z
      .object({
        firstName: z.string({
          required_error: 'firstName is required',
        }),
        lastName: z.string({
          required_error: 'lastName is required',
        }),
      })
      .optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
