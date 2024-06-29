import { z } from "zod";

const createCartValidationSchema = z.object({
  body: z.object({
    productId: z.string(),
    quantity: z.number().min(1),
  }),
});

export const CartValidations = {
  createCartValidationSchema,
};
