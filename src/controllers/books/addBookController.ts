import { NextFunction, Request, Response } from "express";
import { controller, post } from "../decorators";
import { BooksStore } from "../../models/booksStore";
import { Book } from "../../models/booksStore";
import { CustomError } from "../../errors/CustomError";
import { AppRoutePaths } from "../../constants";

@controller(AppRoutePaths.CONTROLLER)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class addBookController{
    @post(AppRoutePaths.ENDPOINTS)
    async addBook(req: Request, res: Response, next: NextFunction){
        const book: Book = {
            name: req.body.name,
            author: req.body.author,
            pages: req.body.pages
        }

        const store = new BooksStore()
        try{
            if( !await store.bookExist(book)){
                const returnBook = await store.createBook(book)
                res.send(returnBook)    
            }else{
                throw new CustomError(`Book with name ${book.name}, author ${book.author}, pages ${book.pages} already exists.`, 422);
            }
        }catch(err){
            next(new CustomError(`${err}`, 422));
        }
    }
}