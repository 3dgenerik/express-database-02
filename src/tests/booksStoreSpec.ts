import { BooksStore } from '../models/booksStore';
import { Book } from '../models/booksStore';

const store = new BooksStore();

const newBook: Book = {
    name: 'Omama',
    author: 'Slobodan Vladusic',
    pages: 278,
};

describe('Testing library: ', () => {
    it('Getting all books: ', async () => {
        const allBooks = await store.index();
        console.log(allBooks);
        expect(allBooks).toBeDefined();
    });

    it('Get book by id: ', async () => {
        const book = await store.getById(1);
        console.log(book);
        expect(book.author).toEqual('Daglas Adams');
    });

    it('Add book: ', async () => {
        const doesBookExist = await store.bookExist(newBook)
        if(!doesBookExist){
            const book = await store.createBook(newBook);
            console.log(book);
            expect(book).toBeDefined();
        }else{
            expect(doesBookExist).toBe(true);
        }
    });
});
