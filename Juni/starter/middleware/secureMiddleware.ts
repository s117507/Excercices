import { Request, Response, NextFunction } from "express";

export function secureMiddleware(req: Request, res: Response, next: NextFunction) {
    next();
}