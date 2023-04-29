import { Sequelize } from "sequelize";

const db = new Sequelize('test', '', '', {
    storage: './database.sqlite',
    dialect: 'sqlite',
    logging: false
});

export default db;