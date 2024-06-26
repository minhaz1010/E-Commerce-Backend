

import { ZodError } from "zod";
import { TErrorMessages } from "../interface";

const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  const message = "Validation Error";
  const errorMessages: TErrorMessages = err.issues.map((error) => {
    return {
      path: error.path[error.path.length - 1] as string,
      message: error.message,
    };
  });

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleZodError;