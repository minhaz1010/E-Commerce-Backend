import {Customer} from "./customer.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import mongoose from "mongoose";
import {ICustomer} from "./custoemr.interface";
import {User} from "../user/user.model";


const getAllCustomerFromDatabase = async () =>{
    console.log('dhukse')
    const result = await Customer.find({isDeleted: false});
    console.log(result,'resui')
   return result;
}

// get single user
const getSingleCustomerFromDatabase = async (id:string) =>{
    const result = await  Customer.findById(id).populate("id");
    if(!result){
        throw  new AppError(httpStatus.NOT_FOUND,'There is no such customer');
    }
    return result
}

// delete single user
const deleteSingleCustomerFromDatabase = async (id:string) =>{
    const  customerId = await  Customer.findById(id);
    if(!customerId){
        throw  new AppError(httpStatus.NOT_FOUND,'No Customer found');
    }
    const userId = customerId.id;
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const updatedUser = await  User.findByIdAndUpdate(userId,{isDeleted:true},{new:true,session});
        console.log({updatedUser})
        if(!updatedUser){
            throw  new AppError(httpStatus.NOT_FOUND,'Went wrong to delete user');
        }

        const updatedCustomer = await  Customer.findByIdAndUpdate(id,{isDeleted:true},{new:true,session});

        if(!updatedCustomer){
            throw  new AppError(httpStatus.NOT_FOUND,'Went wrong to delete customer');
        }

        await  session.commitTransaction();
        await  session.endSession()
        return null;
    }
    catch(error){
        await  session.abortTransaction();
        await  session.endSession();
        console.log({error},'error to delete seller')
        throw  new AppError(httpStatus.FORBIDDEN,'Went wrong to delete customer and user')
    }
}

const updateACustomerInDatabase = async (id:string,customerPayload:Partial<ICustomer>) =>{
    const {address,...remainingData} = customerPayload;
    const modifiedData:Record<string, unknown> = {...remainingData};

    if(address && Object.keys(address).length) {
        for (const [key,value] of Object.entries(address)){
            modifiedData[`address.${key}`] = value;
        }
    }

    const result  = await  Customer.findByIdAndUpdate(id,modifiedData,{new:true});

    return result;
}

export const CustomerService = {
    getAllCustomerFromDatabase,
    getSingleCustomerFromDatabase,
    deleteSingleCustomerFromDatabase,
    updateACustomerInDatabase
}