import { logger } from "../libs/logger";
import MysqlProvider from "./db";
import { Author } from "../models/author";
import { Book } from "../models/book";

export default class BaseProvider {
  protected db: MysqlProvider;
  protected tableName: string;

  constructor(tableName: string) {
    this.db = MysqlProvider.getInstance();
    this.tableName = tableName;
  }

  public async getById(id: string): Promise<Author | Book> {
    const [data] = await this.db.get(this.tableName, ['id = ?'], [id]);

    return data ? data : null;
  }

  public async create(data: Author | Book): Promise<number> {
    return await this.db.insert(this.tableName, data);
  }

  public async update(data: Author | Book): Promise<boolean> {
    const affectedRows = await this.db.update(this.tableName, this.getDataCols(data), this.getDataValues(data));
    return affectedRows > 0;
  }

  public async remove(id: string): Promise<boolean> {
    const affectedRows = await this.db.delete(this.tableName, id);
    return affectedRows > 0;
  }

  protected getDataCols(data: Author | Book): string[] {
    const DBKeys = ['id', 'authorId'];
    const keys = Object.keys(data);
    return keys.filter(key => !DBKeys.find(dbk => key === dbk));
  }

  protected getDataValues(data: Author | Book): string[] {
    const [id, ...vals] = Object.values(data);
    return [...vals, id,]; // moved id to last bcoz WHERE clause's id is last placefolder in query
  }
}
