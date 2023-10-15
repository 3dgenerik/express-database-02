import { NextFunction, Request, Response } from "express";
import { AppRoutePaths } from "../constants";
import { controller, middleware, put } from "./decorators";
import { CustomError } from "../errors/CustomError";
import { BooksStore } from "../models/booksStore";
import { paramsValidationMiddleware } from "../middlewares/paramsValidationMiddleware";
import { Book } from "../models/booksStore";

@controller(AppRoutePaths.CONTROLLER)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UpdateBookController{
    @put(`${AppRoutePaths.ENDPOINTS}/:id`)
    @middleware(paramsValidationMiddleware())
    async updateBookController(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;
        const body = req.body as unknown as Book;

        try{
            const store = new BooksStore()
            const updatedBook = await store.updateBook(Number(id), body)
            if(updatedBook)
                res.send(updatedBook)
            else{
                next(new CustomError(`Book with id: ${id} doesn't exist in database.`, 422))
            }
        }catch(err){
            next(new CustomError(err as string, 422))
        }
    }
}