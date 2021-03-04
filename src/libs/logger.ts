
import pino from 'pino';
import expressPino from 'express-pino-logger';

import dotenvFlow from 'dotenv-flow';

dotenvFlow.config({
  node_env: process.env.NODE_ENV,
  default_node_env: 'dev',
  path: './env'
});

export const logger = pino({ name: 'Bookstore-API', level: process.env.LOG_LEVEL, prettyPrint: true });
export const expressLogger = expressPino({ logger });
