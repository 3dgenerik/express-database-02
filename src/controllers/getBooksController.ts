
import { NextFunction, Request, Response } from "express";
import { get, controller } from "./decorators";
import { BooksStore } from "../models/booksStore";
import { CustomError } from "../errors/CustomError";
import { AppRoutePaths } from "../constants";

@controller(AppRoutePaths.CONTROLLER)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GetBooksController{
    @get(AppRoutePaths.ENDPOINTS)
    async getBooks(req: Request, res: Response, next: NextFunction){
        try{
            const store = new BooksStore()
            const books = await store.index()
            res.send(books)
        }catch(err){
            next(new CustomError(`${err}`, 422));
        }
    }
}