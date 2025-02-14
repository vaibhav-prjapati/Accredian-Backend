// Define the custom error interface
interface CustomError extends Error {
    statusCode?: number;
  }
  
  // Error handler function
  export const errorHandler = (statusCode: number, message: string): CustomError => {
    const error: CustomError = new Error(message);
    error.statusCode = statusCode;
    return error;
  };