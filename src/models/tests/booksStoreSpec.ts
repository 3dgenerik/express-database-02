import { BooksStore } from '../booksStore';
import { Book } from '../booksStore';

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
        const book = await store.getById(2);
        console.log(book);
        expect(book.author).toEqual('Dragos Kalajic');
    });

    fit('Add book: ', async () => {
        const book = await store.createBook(newBook);
        console.log(book);
        expect(book).toBeDefined();
    });
});
