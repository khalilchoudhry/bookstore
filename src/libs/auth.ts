import { logger } from "./logger";
import jwt from 'jsonwebtoken';

export default class Auth {

  // utility to sign tokens
  static generateToken(authorId: string): string {
    try {
      const token = jwt.sign({ authorId }, process.env.APP_SECRET, { algorithm: 'HS256', expiresIn: '24h' });

      return token;
    } catch (error) {
      logger.error(error);
      return '';
    }
  }

  // express middleware handler
  static verifyToken(req: any, res: any, next: any) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) return res.status(401).send({
        msg: 'Token not sent',
        auth: false
      });

      const decoded: any = jwt.verify(token, process.env.APP_SECRET);
      req.local = { authorId: decoded.authorId };
      next();
    } catch (error) {
      logger.error(error);
      return res.status(401).send({
        msg: 'Failed to authenticate token',
        auth: false
      });
    }
  }

}
