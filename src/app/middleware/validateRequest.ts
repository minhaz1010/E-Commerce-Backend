import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsyncErrors from "../utils/catchAsyncError";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({
        body: req.body,
        customer: req.body.customer,
        seller: req.body.seller,
        admin: req.body.admin,
        cookies: req.cookies,
      });

      next();
    },
  );
};

export default validateRequest;
