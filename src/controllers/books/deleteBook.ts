import { NextFunction, Request, Response } from "express";
import { controller, post, del } from "../decorators";
import { BooksStore } from "../../models/booksStore";
import { Book } from "../../models/booksStore";
import { CustomError } from "../../errors/CustomError";
import { AppRoutePaths } from "../../constants";

@controller(AppRoutePaths.CONTROLLER)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class deleteBookController{
    @del(`${AppRoutePaths.ENDPOINTS}/:id`)
    async deleteBook(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;

        const store = new BooksStore()
        try{
            if(await store.idExist(Number(id))){
                const returnBook = await store.deleteBook(Number(id))
                res.send(returnBook)    
            }else{
                throw new CustomError(`Nothing to delete`, 422);
            }
        }catch(err){
            next(new CustomError(`${err}`, 422));
        }
    }
}