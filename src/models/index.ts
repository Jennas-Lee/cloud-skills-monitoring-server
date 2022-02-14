import { Sequelize } from 'sequelize';

const env: string = process.env.NODE_ENV || 'development';
const config = require('../config/config')['default'][env];

const sequelize: Sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export default sequelize;