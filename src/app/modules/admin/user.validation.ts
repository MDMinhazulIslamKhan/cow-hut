import { z } from 'zod';
import { userRoles } from '../user/user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.enum([...userRoles] as [string, ...string[]], {
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
    role: z.enum([...userRoles] as [string, ...string[]]).optional(),
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
