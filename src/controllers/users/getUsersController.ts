import { NextFunction, Request, Response } from "express";
import { AppRoutePaths } from "../../constants";
import { controller, get } from "../decorators";
import { UsersStore } from "../../models/usersStore";
import { CustomError } from "../../errors/CustomError";

@controller(AppRoutePaths.CONTROLLER)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GetUsersController{
    @get(AppRoutePaths.USER_ENDPOINTS)
    async getUsersController(req: Request, res: Response, next: NextFunction){
        try{
            const store = new UsersStore()
            const users = await store.getAllUsers()
            console.log(users);
            res.send(users)
        }catch(err){
            next(new CustomError(`${err}`, 422))
        }
    }
}