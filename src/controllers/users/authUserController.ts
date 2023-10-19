import { NextFunction, Request, Response } from "express";
import { AppRoutePaths } from "../../constants";
import { controller, middleware, post } from "../decorators";
import { IUser, UsersStore } from "../../models/usersStore";
import { CustomError } from "../../errors/CustomError";
import { bodyValidationMiddleware } from "../../middlewares/bodyValidationMiddleware";

@controller(AppRoutePaths.CONTROLLER)
class AuthUserController{

    @post(`${AppRoutePaths.USER_ENDPOINTS}/signin`)
    @middleware(bodyValidationMiddleware(["username", "password"]))
    async authUser(req: Request, res: Response, next: NextFunction){
        try{
            const user: IUser = req.body;
            const store = new UsersStore()
            
            const isUserExist = await store.userExist(user.username)

            if(!isUserExist) throw new CustomError("User not found.", 401);
            
            const authUser = await store.authUser(user)
            const isPasswordMatch = await store.compareHash(user.password, authUser.password)
            
            if(!isPasswordMatch) throw new CustomError("Password doesn't match.", 401);

            res.send(authUser)

            
        }catch(err){
            if(err instanceof CustomError)
                next(err)
            next(new CustomError(`${err}`, 500))
        }
    }
}