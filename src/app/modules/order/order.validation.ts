import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: 'cow is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
