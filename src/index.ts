require('dotenv').config();
import 'reflect-metadata';
import { createServer } from '@graphql-yoga/node';
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize } from './db/db';
import { UserResolver } from './resolvers/user';
import { buildSchema } from 'type-graphql';
import { ClassResolver } from './resolvers/class';
import { EnrollResolver } from './resolvers/enroll';

const app: Express = express();

async function main() {
    try {
        const schema = await buildSchema({
            resolvers: [UserResolver, ClassResolver, EnrollResolver],
            emitSchemaFile: false,
        });

        const server = createServer({
            schema: schema,
        });

        app.use(express.json());
        app.use(cors());
        app.use(cookieParser());
        app.use('/graphql', server);
        await sequelize.sync({ force: true });
        console.log('Connect to db successfully!!!');

        app.listen(4000, () => console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}

main().catch((error) => console.log(`Error starting server: ${error}`));
