import { z } from "zod";

const addressValidation = z.object({
  division: z.string(),
  city: z.string(),
  district: z.string(),
  localArea: z.string().optional(),
});

const createAdminValidationSchema = z.object({
  admin: z.object({
    adminName: z.string(),
    primaryContactNo: z.string(),
    address: addressValidation.required(),
  }),
});

export const AdminValidation = {
  createAdminValidationSchema,
};
