import { NextFunction, Request, Response } from "express";

export function flashMiddleware(req: Request, res: Response, next: NextFunction) {
    next();
};