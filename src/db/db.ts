import { Sequelize } from 'sequelize-typescript';
import { Class } from '../models/Class';
import { Enroll } from '../models/Enroll';
import { User } from '../models/User';

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    models: [Class, User, Enroll],
});
