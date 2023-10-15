import { AppRoutePaths } from "../constants";
import { controller, get, middleware } from "./decorators";
import { BooksStore } from "../models/booksStore";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { paramsValidationMiddleware } from "../middlewares/paramsValidationMiddleware";

@controller(AppRoutePaths.CONTROLLER)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GetBookByIdController{
    @get(`${AppRoutePaths.ENDPOINTS}/:id`)
    @middleware(paramsValidationMiddleware())
    async getBookById(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;
        const store = new BooksStore()
        try{
            const book = await store.getById(Number(id))
            res.send(book)
        }catch(err){
            next(new CustomError(err as string, 422))
        }
    }
}