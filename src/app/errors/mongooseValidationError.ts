

import mongoose from "mongoose";
import httpStatus from "http-status";
import { TErrorMessages } from "../interface";

const mongooseValiDationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = err.name;
  const propertiesName = Object.keys(err.errors);
  const errorMessages: TErrorMessages = propertiesName.map((field) => {
    return {
      path: field,
      message: field + ' is required ',
    };
  });

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default mongooseValiDationError;

