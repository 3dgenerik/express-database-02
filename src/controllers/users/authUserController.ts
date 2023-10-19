import { NextFunction, Request, Response } from "express";
import { AppRoutePaths } from "../../constants";
import { controller, middleware, post } from "../decorators";
import { IUser, UsersStore } from "../../models/usersStore";
import { CustomError } from "../../errors/CustomError";
import { bodyValidationMiddleware } from "../../middlewares/bodyValidationMiddleware";

@controller(AppRoutePaths.CONTROLLER)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AuthUserController{

    @post(`${AppRoutePaths.USER_ENDPOINTS}/signin`)
    @middleware(bodyValidationMiddleware(["username", "password"]))
    async authUser(req: Request, res: Response, next: NextFunction){
        try{
            const user: IUser = req.body;

            const store = new UsersStore()            
            const authUser = await store.authUser(user)
        
            if(!authUser)
                throw new CustomError(`Unauthorized: Provide valid credentials to access.`, 401)    

            res.send(authUser)
            
        }catch(err){
            if(err instanceof CustomError)
                next(err)
            next(new CustomError(`${err}`, 500))
        }
    }
}