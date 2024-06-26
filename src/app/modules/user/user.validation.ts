import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
