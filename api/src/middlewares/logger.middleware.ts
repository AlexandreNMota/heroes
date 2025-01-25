import { NextFunction, Request, Response } from "express";
import logger from "../logger";


const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now(); 
    let errorMessage: string | null = null;

    res.on("finish", () => {
        const duration = Date.now() - start;
        const isError = res.statusCode >= 400;
        if (isError) {
            errorMessage = res.statusMessage || 'Unknown error';
        }

        const logEntry = {
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: duration,
            error: isError,
            errorMessage: errorMessage,
        };

        if (isError) {
            logger.error(JSON.stringify(logEntry));
        } else {
            logger.info(JSON.stringify(logEntry));
        }
    });
    next();
}
export default loggerMiddleware;