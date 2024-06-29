import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    productName: z.string(),
    productBrand: z.string(),
    productDescription: z.string(),
    productCategory: z
      .string({ message: "A product must have one category" })
      .array(),
    productPrice: z.number().min(1),
    stock: z.number().min(1),
    productSize: z.string().array().optional(),
    productColor: z.string().array().optional(),
    productImages: z.string().array().optional(),
    sellerId: z.string({ message: "A product must have a seller" }),
  }),
});

const updateProductValidationSchema = createProductValidationSchema.deepPartial();

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
