import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../errors/CustomError";

const isIdPositive = (id: number)=>{
    if(Number.isNaN(id) || id < 1)
        throw new CustomError('Id should be positive integer.', 422)
}

export const paramsValidationMiddleware = (): RequestHandler=>{
    return (req: Request, res: Response, next: NextFunction)=>{
    
        try{
            // eslint-disable-next-line no-constant-condition
            const id = parseInt(req.params.id as unknown as string);
            isIdPositive(id)
            
            next()

        }catch(error){
            if(error instanceof CustomError){
                next(error)
            }
        }
    }
}