import { Request, Response, NextFunction } from "express";
import z from "zod";

export const validateRequest = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        message: issue.message,
      }));

      return res.status(400).json({
        error: "Invalid request data",
        details: errors,
      });
    }
    next();
  };
};
