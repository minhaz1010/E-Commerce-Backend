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

export const UserController = {
  createCustomer,
};
