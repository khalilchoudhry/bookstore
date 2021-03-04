import express from 'express';
import { logger, expressLogger } from './libs/logger';
import Auth from './libs/auth';
import { AuthorController } from './controller/author.controller';
import { BookController } from './controller/book.controller';
import Joi from 'joi';
import ejv from 'express-joi-validation';

const validator = ejv.createValidator();
const paramSchema = Joi.object({
  id: Joi.string().required()
});

const bookSchema = Joi.object({
  name: Joi.string().required(),
  title: Joi.string().required(),
  pages: Joi.number().required()
});

const bookUpdateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  title: Joi.string().required(),
  pages: Joi.number().required()
});

logger.info({ env: process.env.NODE_ENV });

const app = express();
app.use(expressLogger);
app.use(express.json());

app.post('/login', AuthorController.login);
app.post('/register', AuthorController.register);

app.get('/book/:id', validator.params(paramSchema), Auth.verifyToken, BookController.get);
app.post('/book', validator.body(bookSchema), Auth.verifyToken, BookController.create);
app.put('/book', validator.body(bookUpdateSchema), Auth.verifyToken, BookController.update);
app.delete('/book/:id', validator.params(paramSchema), Auth.verifyToken, BookController.remove);

const port = process.env.PORT || 8080;
logger.info(`BookStore Client app HTTP server running at port: ${port}`);
app.listen(port);
