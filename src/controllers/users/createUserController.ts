import { NextFunction, Request, Response } from "express";
import { AppRoutePaths } from "../../constants";
import { controller, middleware, post } from "../decorators";
import { CustomError } from "../../errors/CustomError";
import { UsersStore, IUser } from "../../models/usersStore";
import { bodyValidationMiddleware } from "../../middlewares/bodyValidationMiddleware";
import jwt  from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config";

@controller(AppRoutePaths.CONTROLLER)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            const token = jwt.sign({user: addedUser}, TOKEN_SECRET!);
            
            res.send(token)
        }catch(err){
            if(err instanceof CustomError)
                next(err)
            next(new CustomError(`${err}`, 422))
        }
    }
}