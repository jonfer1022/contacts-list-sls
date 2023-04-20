import { handlerPath } from "@libs/handler-resolver";
import * as dotenv from "dotenv";
dotenv.config();

export const generateVcard = {
  handler: `${handlerPath(__dirname)}/handler.generateVcard`,
  events: [
    {
      http: {
        method: "post",
        path: "generateVcard/",
        cors: {
          origin: process.env.ORIGIN_CLIENT,
        },
      },
    },
  ],
  environment: {
    ORIGIN_CLIENT: process.env.ORIGIN_CLIENT,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_ACCESS: process.env.SECRET_ACCESS,
    REGION: process.env.AWS_REGION,
  },
};
