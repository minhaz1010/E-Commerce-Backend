import express from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";
import { UserController } from "./user.controller";

const router = express.Router();

router.post(
  "/create-customer",
  ValidateRequest(UserValidations.createUserValidationSchema),
  UserController.createCustomer,
);

export const UserRoutes = router;
