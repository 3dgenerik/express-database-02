import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../errors/CustomError";
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config";


export const verifyAuthToken = (): RequestHandler=>{
    return (req: Request, res: Response, next: NextFunction)=>{
    
        try{
            const authorizationHeader = req.headers.authorization
            console.log('SA MIDLEWARE: ', req.headers);
            const token = authorizationHeader?.split(' ')[1] || ""
            const decoded = jwt.verify(token, TOKEN_SECRET!)

            next()

        }catch(error){
            next(new CustomError(`${error}`, 401))
            
        }
    }
}