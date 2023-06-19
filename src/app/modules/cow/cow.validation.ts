import { z } from 'zod';
import { cowBreed, cowCategory, cowLabel, cowLocation } from './cow.constant';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Cow name is required',
    }),
    age: z.number({
      required_error: 'Cow age is required',
    }),
    price: z.number({
      required_error: 'Cow price is required',
    }),
    location: z.enum([...cowLocation] as [string, ...string[]], {
      required_error: 'Cow location is required',
    }),
    breed: z.enum([...cowBreed] as [string, ...string[]], {
      required_error: 'Cow breed is required',
    }),
    weight: z.number({
      required_error: 'Cow weight is required',
    }),
    label: z.enum([...cowLabel] as [string, ...string[]]).optional(),
    category: z.enum([...cowCategory] as [string, ...string[]], {
      required_error: 'Cow category is required',
    }),
    sellerId: z.string({
      required_error: 'sellerId is required',
    }),
  }),
});
const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...cowLocation] as [string, ...string[]]).optional(),
    breed: z.enum([...cowBreed] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.enum([...cowLabel] as [string, ...string[]]).optional(),
    category: z.enum([...cowCategory] as [string, ...string[]]).optional(),
    sellerId: z.string().optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
