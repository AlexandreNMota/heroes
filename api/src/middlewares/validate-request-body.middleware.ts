import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateRequestBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
         res.status(400).json({
          message: "Corpo da requisição inválido",
          errors: error.errors,
        });
      }
       res.status(500).json({
        message: "Internal server error",
      });
    }
  };
};