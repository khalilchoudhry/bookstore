import bcrypt from 'bcrypt';
import { Author } from "../models/author";
import BaseProvider from "./base.provider";

export default class AuthorProvider extends BaseProvider {

  constructor() {
    super('authors');
  }

  public async getByEmail(email: string): Promise<Author> {
    const [author] = await this.db.get('authors', ['email = ?'], [email]);
    return author;
  }

  public async create(data: Author): Promise<number> {
    return super.create({ ...data, password: bcrypt.hashSync(data.password, 5) });
  }

  verifyPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

}
