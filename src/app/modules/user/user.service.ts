import { ICustomer } from "../customer/custoemr.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { Customer } from "../customer/customer.model";

const createCustomerId = async () => {
  const user = await User.findOne().sort("-userId");
  if (!user) {
    return "C-0001";
  }
  const getTheNumber = Number(user.userId.split("-")[1]);
  const incrementTheNumber = getTheNumber + 1;
  const afterPadding = incrementTheNumber.toString().padStart(4, "0");
  return `C-${afterPadding}`;
};

const createCustomerInDatabase = async (
  email: string,
  password: string,
  customerPayload: Partial<ICustomer>,
) => {
  const userInfo: Partial<IUser> = {};
  userInfo.email = email;
  userInfo.password = password;
  userInfo.userId = await createCustomerId();
  userInfo.role = "customer";
  userInfo.isDeleted = false;
  userInfo.status = "regular";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const newUser = await User.create([userInfo], { session });
    if (newUser.length <= 0) {
      throw new AppError(httpStatus.FORBIDDEN, "Sorry can not create user");
    }

    customerPayload.id = newUser[0]._id;
    customerPayload.email = newUser[0].email;
    customerPayload.password = newUser[0].password;
    customerPayload.customerId = newUser[0].userId;

    const customer = await Customer.create([customerPayload], { session });
    if (customer.length <= 0) {
      throw new AppError(httpStatus.FORBIDDEN, "Sorry can not create customer");
    }

    await session.commitTransaction();
    await session.endSession();

    return customer;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log({error});
    if (error?.code === 11000) {
     throw new AppError(httpStatus.CONFLICT, "Duplicate key error")
    }

    // console.log(error.responseCode)
    // console.log({ error.responseCode });
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Sorry can not create user and customer",
    );
  }
};

export const UserServices = {
  createCustomerInDatabase,
};
