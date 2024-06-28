import catchAsyncErrors from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import {CustomerService} from "./customer.service";


const getAllCustomer = catchAsyncErrors(async(req,res)=>{
    console.log('controller e asche')
    const result = await  CustomerService.getAllCustomerFromDatabase();

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Retrieved all customer successfully",
        result
    })
})

const getASingleCustomer = catchAsyncErrors(async(req,res)=>{
    const result = await  CustomerService.getSingleCustomerFromDatabase(req.params.id);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Retrieved  customer successfully",
        result
    })
})
const deleteASCustomer = catchAsyncErrors(async(req,res)=>{
    await  CustomerService.deleteSingleCustomerFromDatabase(req.params.id);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"delete customer successfully",
        result:null
    })
})

const updateACustomer = catchAsyncErrors(async(req,res)=>{
    const result = await  CustomerService.updateACustomerInDatabase(req.params.id,req.body);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Updated customer successfully",
        result
    })
})

export const CustomerController = {
    getAllCustomer,
    getASingleCustomer,
    deleteASCustomer,
    updateACustomer,
}