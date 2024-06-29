import { IProducts } from "./product.interface";
import { Product } from "./product.model";
import { Seller } from "../seller/seller.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const createProductInDatabase = async (productPayload: IProducts) => {
  const { sellerId } = productPayload;

  const seller = await Seller.findById(sellerId);
  if (!seller) {
    throw new AppError(httpStatus.BAD_REQUEST, "No seller found");
  }

  const products = await Product.create(productPayload);
  return products;
};

const getAllProductsFromDatabase = async () => {
  const result = await Product.find({ productStatus: "available" });
  return result;
};

const getSingleProductFromDatabase = async (id: string) => {
  const result = await Product.findById(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "No products found");
  }
  return result;
};
const deleteSingleProductFromDatabase = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, "No product found");
  }
  await Product.findByIdAndDelete(id);
  return null;
};

const updateAProductInDatabase = async (
  id: string,
  productPayload: Partial<IProducts>,
) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, "No product found");
  }
  const result = await Product.findByIdAndUpdate(id, productPayload, {
    new: true,
  });

  return result;
};

export const ProductService = {
  createProductInDatabase,
  getAllProductsFromDatabase,
  getSingleProductFromDatabase,
  updateAProductInDatabase,
  deleteSingleProductFromDatabase,
};
