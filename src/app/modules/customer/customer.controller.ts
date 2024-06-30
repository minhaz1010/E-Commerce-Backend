import catchAsyncErrors from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CustomerService } from "./customer.service";

const getAllCustomer = catchAsyncErrors(async (req, res) => {
  console.log("controller e asche");
  const result = await CustomerService.getAllCustomerFromDatabase();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Retrieved all customer successfully",
    result,
  });
});

const getASingleCustomer = catchAsyncErrors(async (req, res) => {
  const result = await CustomerService.getSingleCustomerFromDatabase(
    req.params.id,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Retrieved  customer successfully",
    result,
  });
});
const deleteASCustomer = catchAsyncErrors(async (req, res) => {
  await CustomerService.deleteSingleCustomerFromDatabase(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "delete customer successfully",
    result: null,
  });
});

const updateACustomer = catchAsyncErrors(async (req, res) => {
  const result = await CustomerService.updateACustomerInDatabase(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Updated customer successfully",
    result,
  });
});

const addProductIntoCart = catchAsyncErrors(async (req, res) => {
  const result = await CustomerService.addProductToCartInDatabase(
    req.params.customerId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "product added to cart successfully",
    result,
  });
});

const getProductsFromCart = catchAsyncErrors(async (req, res) => {
  const result = await CustomerService.cartDetails(req.params.customerId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "cart details retreived successfully",
    result,
  });
});


const updateCartDetails = catchAsyncErrors(async (req,res)=>{
  console.log(req.params)
  const {customerId,productId} = req.params;
  const {quantity}  = req.body;

  const result = await CustomerService.updateCartDetailsOnASpecificProduct(customerId,productId,quantity);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "cart details updated successfully",
    result
  })
})

const deleteCartItemFromCart = catchAsyncErrors(async (req,res)=>{
  const result = await CustomerService.deleteProductFromCartFromDatabase(req.params.customerId,req.params.productId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "cart item removed successfully",
    result
  })
})

export const CustomerController = {
  getAllCustomer,
  getASingleCustomer,
  deleteASCustomer,
  updateACustomer,
  addProductIntoCart,
  getProductsFromCart,
  updateCartDetails,
  deleteCartItemFromCart
};
