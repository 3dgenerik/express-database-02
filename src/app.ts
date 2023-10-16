import express from 'express';
import { PORT } from './config';
import { catchErrorMiddleware } from './middlewares/catchErrorMiddleware';
import { RouteApp } from './RouteApp';
import './controllers/getBooksController'
import './controllers/addBookController'
import './controllers/getBookByIdController'
import './controllers/updateBookController'
import './controllers/deleteBook'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(RouteApp.getInstance());
app.use(catchErrorMiddleware);


app.listen(PORT, () => {
    console.log(`...listening port ${PORT}`);
});

export default app;
