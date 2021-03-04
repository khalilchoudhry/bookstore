import Auth from "../libs/auth";
import { logger } from "../libs/logger";
import AuthorProvider from "../providers/author.provider.";

export class AuthorController {
  public static async login(req: any, res: any, next: any) {
    try {
      const authorP = new AuthorProvider();
      const { email, password } = req.body;

      const author = await authorP.getByEmail(email);
      if (author) {
        const verfied = authorP.verifyPassword(password, author.password);
        if (verfied) {
          const token = Auth.generateToken(author.id);
          return res.send({ auth: true, token });
        }
      }
      res.send({ auth: false, token: null });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  }

  public static async register(req: any, res: any, next: any) {
    try {
      const authorP = new AuthorProvider();
      const { name, email, password } = req.body;

      let author = await authorP.getByEmail(email);
      if (!author) {
        await authorP.create({ name, email, password });
        author = await authorP.getByEmail(email);
        const token = Auth.generateToken(author.id);
        return res.send({ auth: true, token });
      }
      res.send({ auth: false, token: null });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  }
}
