import {Seller} from "./seller.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import {ISeller} from "./serller.interface";
import mongoose from "mongoose";
import {User} from "../user/user.model";


const getAllSellerFromDatabase = async () =>{
    const result  =  await  Seller.find({isDeleted:false});
    return result;
}

// get single user
const getSingleSellerFromDatabase = async (id:string) =>{
    const result = await  Seller.findById(id).populate("id");
    if(!result){
        throw  new AppError(httpStatus.NOT_FOUND,'There is no such seller');
    }
    return result
}

// delete single user
const deleteSingleSellerFromDatabase = async (id:string) =>{
    const  seller = await  Seller.findById(id);
    if(!seller){
        throw  new AppError(httpStatus.NOT_FOUND,'No seller found');
    }
    const userId = seller.id;
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const updatedUser = await  User.findByIdAndUpdate(userId,{isDeleted:true},{new:true,session});
        console.log({updatedUser})
        if(!updatedUser){
            throw  new AppError(httpStatus.NOT_FOUND,'Went wrong to delete user');
        }

        const updatedSeller = await  Seller.findByIdAndUpdate(id,{isDeleted:true},{new:true,session});

        if(!updatedSeller){
            throw  new AppError(httpStatus.NOT_FOUND,'Went wrong to delete seller');
        }

        await  session.commitTransaction();
        await  session.endSession()
       return null;
    }
    catch(error){
        await  session.abortTransaction();
        await  session.endSession();
        console.log({error},'error to delete seller')
        throw  new AppError(httpStatus.FORBIDDEN,'Went wrong to delete seller and user')
    }
}

const updateASellerInDatabase = async (id:string,sellerPayload:Partial<ISeller>) =>{
    const {storeAddress,...remainingData} = sellerPayload;
    const modifiedData:Record<string, unknown> = {...remainingData};

    if(storeAddress && Object.keys(storeAddress).length) {
        for (const [key,value] of Object.entries(storeAddress)){
            modifiedData[`storeAddress.${key}`] = value;
        }
    }

    const result  = await  Seller.findByIdAndUpdate(id,modifiedData,{new:true});

    return result;
}

export const SellerService = {
    getAllSellerFromDatabase,
    getSingleSellerFromDatabase,
    updateASellerInDatabase,
    deleteSingleSellerFromDatabase
}