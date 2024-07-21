import { z } from "zod";

export const createCryptoSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    symbol: z
      .string()
      .min(1, { message: "Symbol is required" })
      .refine((value) => value === value.toUpperCase(), {
        message: "Symbol must be uppercase",
      }),
    price: z
      .number()
      .min(0, { message: "Price must be a positive number or zero" }),
  }),
});

export const updateCryptoSchema = z.object({
  params: z.object({
    id: z.string().min(1, { message: "Id is required" }),
  }),
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    symbol: z
      .string()
      .min(1, { message: "Symbol is required" })
      .refine((value) => value === value.toUpperCase(), {
        message: "Symbol must be uppercase",
      }),
    price: z
      .number()
      .min(0, { message: "Price must be a positive number or zero" }),
  }),
});
