
 import httpStatus from "http-status";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import { TErrorMessages } from "../interface";

export const handleTokenExpiredError = (err: TokenExpiredError) => {
  const statusCode = httpStatus.FORBIDDEN;
  const message = "Token expired";
  const errorMessages: TErrorMessages = [
    {
      path: "",
      message: err.name,
    },
  ];
  return {
    statusCode,
    message,
    errorMessages,
  };
};

export const handleJsonWebTokenError = (err: JsonWebTokenError) => {
  const statusCode = httpStatus.FORBIDDEN;
  const message =
    "Invalid token - the header or payload could not be parsed or jwt malformed";
  const errorMessages: TErrorMessages = [
    {
      path: "",
      message: err.name,
    },
  ];
  return {
    statusCode,
    message,
    errorMessages,
  };
};

export const notBeforeError = (err: NotBeforeError) => {
  const statusCode = httpStatus.FORBIDDEN;
  const message = "jwt is not active anymore";
  const errorMessages: TErrorMessages = [
    {
      path: "",
      message: err.name,
    },
  ];
  return {
    statusCode,
    message,
    errorMessages,
  };
};
