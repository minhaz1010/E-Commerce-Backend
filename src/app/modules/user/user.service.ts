import { ICustomer } from "../customer/custoemr.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { Customer } from "../customer/customer.model";
import { createCustomerId, createSellerId } from "./user.utils";
import { ISeller } from "../seller/serller.interface";
import { Seller } from "../seller/seller.model";

// customer
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
  } catch (error: unknown) {
    await session.abortTransaction();
    await session.endSession();
    console.log({ error });
    // @ts-ignore
    if (error?.code === 11000) {
      throw new AppError(httpStatus.CONFLICT, "Duplicate key error");
    }

    // console.log(error.responseCode)
    // console.log({ error.responseCode });
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Sorry can not create user and customer",
    );
  }
};

//  seller
const createSellerInDatabase = async (
  email: string,
  password: string,
  sellerPayload: Partial<ISeller>,
) => {
  const userInfo: Partial<IUser> = {};
  userInfo.email = email;
  userInfo.password = password;
  userInfo.userId = await createSellerId();
  userInfo.role = "seller";
  userInfo.isDeleted = false;
  userInfo.status = "regular";
  // console.log({ userInfo });
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const newUser = await User.create([userInfo], { session });
    if (newUser.length <= 0) {
      throw new AppError(httpStatus.FORBIDDEN, "Sorry can not create user");
    }
    // console.log({ newUser });
    sellerPayload.id = newUser[0]._id;
    sellerPayload.email = newUser[0].email;
    sellerPayload.password = newUser[0].password;
    sellerPayload.sellerId = newUser[0].userId;

    const seller = await Seller.create([sellerPayload], { session });
    if (seller.length <= 0) {
      throw new AppError(httpStatus.FORBIDDEN, "Sorry can not create seller");
    }

    await session.commitTransaction();
    await session.endSession();

    return seller;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    console.log({ error }, "error seller");
    if (error?.code === 11000) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Duplicate key error  ${JSON.stringify(error?.keyValue)}`,
      );
    }

    // console.log(error.responseCode)
    // console.log({ error.responseCode });
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Sorry can not create user and seller",
    );
  }
};

export const UserServices = {
  createCustomerInDatabase,
  createSellerInDatabase,
};
