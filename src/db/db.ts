import { Sequelize } from 'sequelize-typescript';
import { Class } from '../models/Class';
import { Enroll } from '../models/Enroll';
import { User } from '../models/User';

export const sequelize = new Sequelize({
    database: 'postgres',
    dialect: 'postgres',
    username: 'khangne',
    password: 'khangne_secret_password',
    host: 'localhost',
    models: [Class, User, Enroll],
});
