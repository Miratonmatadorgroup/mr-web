import { ErrorMessage } from "../pageUtils";
import axios from "axios";

const ErrorLogger = (message: string) => {
  if ((process.env.NODE_ENV ?? "development") !== "production") {
    console.error(message);
  } else {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
};

export default ErrorLogger;

export const ErrorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 400) {
      return ErrorMessage(error.response.data.message);
    }
    if (error.response?.status === 401) {
      return ErrorMessage(error.response.data.message);
    }
    if (error.response?.status === 500) {
      return ErrorMessage(error.response.data.message);
    }
  } else ErrorLogger("An unknown error occurred: " + error.message);
};
