import catchAsyncErrors from "../../utils/catchAsyncError";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCustomer = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  const result = await UserServices.createCustomerInDatabase(
    email,
    password,
    req.body.customer,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Customer created successfully",
    result,
  });
});

const createSeller = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  const result = await UserServices.createSellerInDatabase(
    email,
    password,
    req.body.seller,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Seller created successfully",
    result,
  });
});

const createAdmin = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  const result = await UserServices.createAdminInDatabase(
    email,
    password,
    req.body.admin,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Admin created successfully",
    result,
  });
});

export const UserController = {
  createCustomer,
  createSeller,
  createAdmin,
};
