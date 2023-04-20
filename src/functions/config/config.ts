import * as dotenv from 'dotenv';
dotenv.config();

const environment = {
  db: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
  },
};

export default environment;
