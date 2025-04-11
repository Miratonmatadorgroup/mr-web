const ErrorLogger = (message: string) => {
    if ((process.env.NODE_ENV ?? "development") !== "production") {
      console.error(message);
    }
  };
  
  export default ErrorLogger;
  