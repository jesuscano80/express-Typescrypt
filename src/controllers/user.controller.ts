import { NextFunction, Response, Request } from "express";

export const home=(req: Request, res: Response, next: NextFunction)=>{
    try {
        res.status(200).json({message:"success"})        
    } catch (error) {
        next(error);
    }
}