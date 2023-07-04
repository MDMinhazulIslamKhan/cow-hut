import { z } from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
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
  }),
});

const updateAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
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
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  updateAdminZodSchema,
};
