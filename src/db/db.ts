import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    database: 'postgres',
    dialect: 'postgres',
    username: 'khangne',
    password: 'khangne_secret_password',
    host: 'localhost',
});
