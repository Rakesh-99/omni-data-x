// Error handler middleware : 

import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = (err: Error & { statusCode: number }, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error!";
    err.stack = err.stack

    res.status(err.statusCode).json({
        success: false,
        message: `${err.message}`,
        stackErrMessage: `${err.stack}`
    })
};

export default errorHandlerMiddleware;