
import mysql from 'mysql';
import { Author } from '../models/author';
import { Book } from '../models/book';
import { logger } from '../libs/logger';

export default class DBProvider {
  private mysqlClient: mysql.Connection;
  private static instance: DBProvider;

  private constructor() {
    this.mysqlClient = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      port: 3306
    });
    logger.info('Database Instantiated');

    this.mysqlClient.on('error', (error) => {
      logger.error(error);
    });
  }

  public static getInstance(): DBProvider {
    if (!DBProvider.instance) {
      DBProvider.instance = new DBProvider();
    }
    return DBProvider.instance;
  }

  public get(tableName: string, where: string[], whereData: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mysqlClient.query(`SELECT * FROM ${tableName} where ${where.join(' and ')}`, whereData, (err, rslts, fields) => {
        if (err) return reject(err);
        resolve(rslts);
      });
    });
  }

  public insert(tableName: string, data: Author | Book): Promise<number> {
    return new Promise((resolve, reject) => {
      this.mysqlClient.query(`INSERT INTO ${tableName} SET ?`, data, (err, rslts, fields) => {
        if (err) return reject(err);
        resolve(rslts.insertId);
      });
    });
  }

  public update(tableName: string, set: string[], data: any[]): Promise<number> {
    return new Promise((resolve, reject) => {
      let setQuery = '';
      set.forEach((sq, i) => {
        setQuery += `${sq} = ?`;
        if (i !== set.length - 1)
          setQuery += ', ';
      });

      this.mysqlClient.query(
        `UPDATE ${tableName} SET ${setQuery} where id = ?`,
        data,
        (err, rslts, fields) => {
          if (err) return reject(err);
          resolve(rslts.affectedRows);
        });
    });
  }

  public delete(tableName: string, id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.mysqlClient.query(`DELETE FROM ${tableName} where id = ?`, [id], (err, rslts, fields) => {
        if (err) return reject(err);
        resolve(rslts.affectedRows);
      });
    });
  }

}
