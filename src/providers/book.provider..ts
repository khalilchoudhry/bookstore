import { Book } from "../models/book";
import BaseProvider from "./base.provider";

export default class BookProvider extends BaseProvider {
  constructor() {
    super('books');
  }

  public async getByAuthorId(bId: string, aId: string): Promise<Book> {
    const [data] = await this.db.get(this.tableName, ['id = ?', 'authorId = ?'], [bId, aId]);
    return data;
  }

  protected getDataValues(data: Book): string[] {
    const FKeys = ['authorId'];
    const dataWithoutFKeys: any = { ...data };
    FKeys.forEach(fkey => delete dataWithoutFKeys[fkey]);
    return super.getDataValues(dataWithoutFKeys);
  }
}
