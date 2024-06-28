import catchAsyncErrors from "../../utils/catchAsyncError";
import {SellerService} from "./seller.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const getAllSeller = catchAsyncErrors(async(req,res)=>{
    const result = await  SellerService.getAllSellerFromDatabase();

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Retrieved all seller successfully",
        result
    })
})

const getASingleSeller = catchAsyncErrors(async(req,res)=>{
    const result = await  SellerService.getSingleSellerFromDatabase(req.params.id);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Retrieved  seller successfully",
        result
    })
})
const deleteASeller = catchAsyncErrors(async(req,res)=>{
    await  SellerService.deleteSingleSellerFromDatabase(req.params.id);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"delete seller successfully",
        result:null
    })
})

const updateASeller = catchAsyncErrors(async(req,res)=>{
    const result = await  SellerService.updateASellerInDatabase(req.params.id,req.body);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Updated seller successfully",
        result
    })
})

export const SellerController = {
    getAllSeller,
    getASingleSeller,
    updateASeller,
    deleteASeller
}