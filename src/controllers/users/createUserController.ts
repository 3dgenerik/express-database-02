import { NextFunction, Request, Response } from "express";
import { AppRoutePaths } from "../../constants";
import { controller, middleware, post } from "../decorators";
import { CustomError } from "../../errors/CustomError";
import { UsersStore, IUser } from "../../models/usersStore";
import { validator } from "../decorators";
import { bodyValidationMiddleware } from "../../middlewares/bodyValidationMiddleware";

@controller(AppRoutePaths.CONTROLLER)
class CreateUserController{
    @post(`${AppRoutePaths.USER_ENDPOINTS}/signup`)
    @middleware(bodyValidationMiddleware(["username", "password"]))
    async createUSer(req: Request, res: Response, next: NextFunction){
        const {username, password} = req.body as IUser;

        const user: IUser = {
            username,
            password
        }

        try{
            const store = new UsersStore()
            const isUserExist = await store.userExist(user.username)

            if(isUserExist)
                throw new CustomError('User already exists.', 422)

            const addedUser = await store.createUser(user)
            res.send(addedUser)
        }catch(err){
            if(err instanceof CustomError)
                next(err)
            next(new CustomError(`${err}`, 422))
        }
    }
}