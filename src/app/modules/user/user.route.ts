import express from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { SellerValidation } from "../seller/seller.validation";
import { CustomerValidation } from "../customer/customer.validation";

const router = express.Router();

router.post(
  "/create-customer",
  ValidateRequest(UserValidations.createUserValidationSchema),
  validateRequest(CustomerValidation.createCustomerValidation),
  UserController.createCustomer,
);

router.post(
  "/create-seller",
  validateRequest(UserValidations.createUserValidationSchema),
  validateRequest(SellerValidation.createSellerValidation),
  UserController.createSeller,
);

export const UserRoutes = router;
