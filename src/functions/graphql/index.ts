import { handlerPath } from '@libs/handler-resolver';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'any',
        path: 'graphql',
      },
    },
  ],
  environment: {
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_ACCESS: process.env.SECRET_ACCESS,
    REGION: process.env.AWS_REGION,
  }
};
// environment: {
//   DB_DATABASE: process.env.DB_DATABASE,
//   DB_USERNAME: process.env.DB_USERNAME,
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   DB_HOST: process.env.DB_HOST,
//   DATABASE_URL: process.env.DATABASE_URL,
//   JWT_SECRET: process.env.JWT_SECRET,
//   REACT_APP_CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
//   KEY_CRYPTO: process.env.KEY_CRYPTO,
//   BUCKET_NAME: process.env.BUCKET_NAME,
//   ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
//   SECRET_ACCESS: process.env.AWS_SECRET_ACCESS_KEY,
//   DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
//   EMAIL_ADMIN: process.env.EMAIL_ADMIN,
//   ORIGIN_CLIENT: process.env.ORIGIN_CLIENT,
// },
