import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    'src',
    '@config',
    '.env',
    `.env.${process.env.NODE_ENV}`,
  ),
});

const config = {
  SERVICE_NAME: process.env.SERVICE_NAME,
  SERVICE_HOST: process.env.SERVICE_HOST,
  SERVICE_PORT: process.env.SERVICE_PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  },
  ENCDECRYPT_KEY: process.env.ENCDECRYPT_KEY,
  POSTGRE: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
  },
  RABBIT_MQ_CONNECTION_URL: process.env.RABBIT_MQ_CONNECTION_URL,
};

export default config;
