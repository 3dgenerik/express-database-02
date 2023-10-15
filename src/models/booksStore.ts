import client from './tests/helpers/database';

export type Book = {
    id?: number;
    name?: string;
    author?: string;
    pages?: number;
};

export class BooksStore {
    async index(): Promise<Book[]> {
        const conn = await client.connect();
        const sql = 'SELECT * FROM books';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;

    }

    async getById(id: number): Promise<Book> {
        const conn = await client.connect();
        const sql = 'SELECT * FROM books WHERE id=($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }

    async createBook(book: Book): Promise<Book> {
        const conn = await client.connect();
        const sql =
            'INSERT INTO books (name, author, pages) VALUES($1, $2, $3) RETURNING *';
        const result = await conn.query(sql, [
            book.name,
            book.author,
            book.pages,
        ]);
        conn.release();
        return result.rows[0];
    }

    async updateBook(id: number, book: Book):Promise<Book>{
        const getBookByID = await this.getById(id)

        const name: string = getBookByID ? (book.name ?? getBookByID.name ?? '') : '';
        const author: string = getBookByID ? (book.author ?? getBookByID.author ?? '') : '';
        const pages: number  = getBookByID ?( book.pages ?? getBookByID.pages ?? 0) : 0;


        const conn = await client.connect()
        const sql = 'UPDATE books SET name = ($1), author = ($2), pages = ($3) WHERE id = ($4) RETURNING *'
        const result = await conn.query(sql, [name, author, pages, id])
        conn.release();
        return result.rows[0]
    }
}
