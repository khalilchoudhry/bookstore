import { logger } from "../libs/logger";
import BookProvider from "../providers/book.provider.";

export class BookController {
  public static async get(req: any, res: any, next: any) {
    try {
      const bookP = new BookProvider();
      const { id: bookId } = req.params;
      const book = await bookP.getById(bookId);

      if (!book) {
        // status code could be set to 404 here dependingon whats decided btw the teams
        res.send({ msg: 'Book not found' });
      }
      res.send(book);
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  }

  public static async create(req: any, res: any, next: any) {
    try {
      const bookP = new BookProvider();
      const { name, pages, title } = req.body;

      const { authorId } = req.local;
      await bookP.create({ name, pages, title, authorId });
      res.send({ msg: 'Book created' });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  }

  public static async update(req: any, res: any, next: any) {
    try {
      const bookP = new BookProvider();
      const { id, name, pages, title } = req.body;
      const { authorId } = req.local;
      const book = await bookP.getByAuthorId(id, authorId);
      if (book) {
        await bookP.update({ id, name, pages, title, authorId });
        return res.send({ msg: 'Book updated' });
      }
      res.send({ msg: 'Not authorized to edit book' });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  }

  public static async remove(req: any, res: any, next: any) {
    try {
      const bookP = new BookProvider();
      const { id: bookId } = req.params;
      const { authorId } = req.local;

      const book = await bookP.getByAuthorId(bookId, authorId);
      if (book) {
        await bookP.remove(bookId);
        return res.send({ msg: 'Book removed permanently' });
      }
      res.send({ msg: 'Not authorized to edit book' });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  }

}
