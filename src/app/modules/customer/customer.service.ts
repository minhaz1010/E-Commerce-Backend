import { Customer } from "./customer.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { ICustomer } from "./custoemr.interface";
import { User } from "../user/user.model";
import { ICart } from "../cart/cart.interface";
import { Cart } from "../cart/cart.model";
import {Product} from "../products/product.model";

const getAllCustomerFromDatabase = async () => {
  const result = await Customer.find({ isDeleted: false });
  return result;
};

// get single user
const getSingleCustomerFromDatabase = async (id: string) => {
  const result = await Customer.findById(id).populate("id");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "There is no such customer");
  }
  return result;
};

// delete single user
const deleteSingleCustomerFromDatabase = async (id: string) => {
  const customerId = await Customer.findById(id);
  if (!customerId) {
    throw new AppError(httpStatus.NOT_FOUND, "No Customer found");
  }
  const userId = customerId.id;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    console.log({ updatedUser });
    if (!updatedUser) {
      throw new AppError(httpStatus.NOT_FOUND, "Went wrong to delete user");
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!updatedCustomer) {
      throw new AppError(httpStatus.NOT_FOUND, "Went wrong to delete customer");
    }

    await session.commitTransaction();
    await session.endSession();
    return null;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log({ error }, "error to delete seller");
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Went wrong to delete customer and user",
    );
  }
};

const updateACustomerInDatabase = async (
  id: string,
  customerPayload: Partial<ICustomer>,
) => {
  const { address, ...remainingData } = customerPayload;
  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedData[`address.${key}`] = value;
    }
  }

  const result = await Customer.findByIdAndUpdate(id, modifiedData, {
    new: true,
  });

  return result;
};

const addProductToCartInDatabase = async (
    customerId: string,
    cartPayload: ICart,
) => {
  const session = await mongoose.startSession();
  const { productId, quantity } = cartPayload;

  const product = await Product.findById(productId);
  // check product is exist or not
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "No product found");
  }

  try {
    session.startTransaction();

    let cartItem = await Cart.findOne({ productId }).session(session);

    // check the same product id in cart is exist or not
    // if exist then just update
    // if not exist then just create
    if (!cartItem) {
      const newCartItem = new Cart({
        productId: cartPayload.productId,
        quantity: cartPayload.quantity,
      });

      cartItem = await newCartItem.save({ session });

      if (!cartItem) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create cart item");
      }

      const cartIntoCustomer = await Customer.findByIdAndUpdate(
          customerId,
          {
            $push: { cart: cartItem._id },
          },
          { new: true, session },
      );

      if (!cartIntoCustomer) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to add cart item to customer");
      }

    } else {
      cartItem.quantity += quantity;
      await cartItem.save({ session });

      const cartIntoCustomer = await Customer.findByIdAndUpdate(
          customerId,
          {
            $addToSet: { cart: cartItem._id }, // Use $addToSet to avoid duplicates
          },
          { new: true, session },
      );

      if (!cartIntoCustomer) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update cart item in customer");
      }
    }

    await session.commitTransaction();
    await session.endSession();

    return cartItem;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log({ error }, "cart error");
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to add items to cart");
  }
};

const cartDetails = async (cutomerId: string) => {
  const result = await  Customer.findById(cutomerId).populate({
    path: 'cart',
    populate: { path: 'productId' ,model:"Product",select:"productName productPrice" },
  }).select("cart customerName")
  return result;
};

export const CustomerService = {
  getAllCustomerFromDatabase,
  getSingleCustomerFromDatabase,
  deleteSingleCustomerFromDatabase,
  updateACustomerInDatabase,
  addProductToCartInDatabase,
  cartDetails,
};
