import { z } from "zod";

const addressValidation = z.object({
  division: z.string(),
  district: z.string(),
  city: z.string(),
  localArea: z.string(),
});

const createCustomerValidation = z.object({
  customer: z.object({
    customerName: z.string(),
    primaryContactNo: z.string(),
    secondaryContactNo: z.string().optional(),
    address: addressValidation.required(),
  }),
});

export const CustomerValidation = {
  createCustomerValidation,
};
