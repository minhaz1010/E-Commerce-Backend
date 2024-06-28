import { z } from "zod";
const addressValidation = z.object({
  division: z.string(),
  district: z.string(),
  city: z.string(),
  localArea: z.string(),
  storeNo: z.string(),
});

const createSellerValidation = z.object({
  seller: z.object({
    sellerName: z.string(),
    storeName: z.string(),
    primaryContactNo: z.string(),
    secondaryContactNo: z.string().optional(),
    storeAddress: addressValidation.required(),
  }),
});

export const SellerValidation = {
  createSellerValidation,
};
