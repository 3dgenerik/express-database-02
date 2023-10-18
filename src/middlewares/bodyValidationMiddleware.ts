import { NextFunction, Request, RequestHandler, Response } from "express"
import { IUser } from "../models/usersStore"
import { CustomError } from "../errors/CustomError";

export const bodyValidationMiddleware = (keys: (keyof IUser)[]): RequestHandler=>{
    return (req: Request, res: Response, next: NextFunction)=>{
        try{
            const user: IUser = req.body;
            
            for (const key of keys) {
                if(!user[key]){
                   throw new CustomError('Please provide valid username or password', 422)
                }
            }
            
            const isUserNameNum = Number.isNaN(Number(user.username))
            if(!isUserNameNum){
                throw new CustomError(`Username can't be a number.`, 422)
            }

            next()
        }catch(err){
            if(err instanceof CustomError)
                next(err)
        }

        
    }
}