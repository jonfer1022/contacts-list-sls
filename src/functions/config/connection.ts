import { Sequelize } from 'sequelize-typescript';
import environments from './config';
const db = environments.db;

export const sqlz = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: 'mysql',
  logging: false,
  pool: { min: 0, max: 1, idle: 15000, evict: 500 },
});

export async function init() {
  try {
    console.log('The connection to the db was started.');
    await sqlz.authenticate();
    await sqlz.sync();
    console.log('Db connection established');
  } catch (err) {
    console.log(`Error while connecting to db: ${err}`);
  }
}
