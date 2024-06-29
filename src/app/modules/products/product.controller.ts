import catchAsyncErrors from "../../utils/catchAsyncError";
import { ProductService } from "./product.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProduct = catchAsyncErrors(async (req, res) => {
  const result = await ProductService.createProductInDatabase(req.body);
  sendResponse(res, {
    success: true,
    message: "Product created successfully",
    statusCode: httpStatus.CREATED,
    result,
  });
});

const getAllProduct = catchAsyncErrors(async (req, res) => {
  const result = await ProductService.getAllProductsFromDatabase();
  sendResponse(res, {
    success: true,
    message: "All Products retrieved successfully",
    statusCode: httpStatus.OK,
    result,
  });
});

const getASingleProduct = catchAsyncErrors(async (req, res) => {
  const result = await ProductService.getSingleProductFromDatabase(
    req.params.id,
  );
  sendResponse(res, {
    success: true,
    message: "Product retrieved successfully",
    statusCode: httpStatus.OK,
    result,
  });
});

const updateProduct = catchAsyncErrors(async (req, res) => {
  const result = await ProductService.updateAProductInDatabase(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: "Product updated successfully",
    statusCode: httpStatus.OK,
    result,
  });
});

const deleteProduct = catchAsyncErrors(async (req, res) => {
  const result = await ProductService.deleteSingleProductFromDatabase(
    req.params.id,
  );
  sendResponse(res, {
    success: true,
    message: "Product deleted successfully",
    statusCode: httpStatus.OK,
    result,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  getASingleProduct,
  updateProduct,
  deleteProduct,
};
