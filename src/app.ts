import express from 'express';
import { PORT } from './config';
import { catchErrorMiddleware } from './middlewares/catchErrorMiddleware';
import { RouteApp } from './RouteApp';
import './controllers/books/getBooksController'
import './controllers/books/addBookController'
import './controllers/books/getBookByIdController'
import './controllers/books/updateBookController'
import './controllers/books/deleteBook'
import './controllers/users/getUsersController'
import './controllers/users/createUserController'
import './controllers/users/authUserController'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(RouteApp.getInstance());
app.use(catchErrorMiddleware);


app.listen(PORT, () => {
    console.log(`...listening port ${PORT}`);
});

export default app;
