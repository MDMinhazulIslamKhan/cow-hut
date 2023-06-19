"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Cow name is required',
        }),
        age: zod_1.z.number({
            required_error: 'Cow age is required',
        }),
        price: zod_1.z.number({
            required_error: 'Cow price is required',
        }),
        location: zod_1.z.enum([...cow_constant_1.cowLocation], {
            required_error: 'Cow location is required',
        }),
        breed: zod_1.z.enum([...cow_constant_1.cowBreed], {
            required_error: 'Cow breed is required',
        }),
        weight: zod_1.z.number({
            required_error: 'Cow weight is required',
        }),
        label: zod_1.z.enum([...cow_constant_1.cowLabel]).optional(),
        category: zod_1.z.enum([...cow_constant_1.cowCategory], {
            required_error: 'Cow category is required',
        }),
        sellerId: zod_1.z.string({
            required_error: 'sellerId is required',
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constant_1.cowLocation]).optional(),
        breed: zod_1.z.enum([...cow_constant_1.cowBreed]).optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum([...cow_constant_1.cowLabel]).optional(),
        category: zod_1.z.enum([...cow_constant_1.cowCategory]).optional(),
        sellerId: zod_1.z.string().optional(),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
