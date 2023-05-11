import { handlerPath } from "@libs/handler-resolver";
import * as dotenv from "dotenv";
import schema from "./schema";
dotenv.config();

export const confirmSignUp = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "confirmSignUp/",
        cors: {
          origin: process.env.ORIGIN_CLIENT,
        },
        request: {
          schemas: {
            "application/json": schema,
          },
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
    AWS_COGNITO_SECRET_CLIENT_ID: process.env.AWS_COGNITO_SECRET_CLIENT_ID,
    AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
    AWS_REGION_FIRST: process.env.AWS_REGION_FIRST,
  },
};
