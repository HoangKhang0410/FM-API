require('dotenv').config();
import 'reflect-metadata';
import { createServer } from '@graphql-yoga/node';
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize } from './db/db';
import { UserResolver } from './resolvers/user';
import { buildSchema } from 'type-graphql';
import { applyMiddleware } from 'graphql-middleware';
import { rule, shield } from 'graphql-shield';
import { Context } from './types/Context';

const app: Express = express();

async function main() {
    try {
        const schema = await buildSchema({
            resolvers: [UserResolver],
            emitSchemaFile: false,
        });

        const permissions = shield({
            Query: {
                getUsers: isAuthenticated,
            },
            Mutation: {},
        });
        const schemaWithPermission = applyMiddleware(schema, permissions);

        const server = createServer({
            schema: schemaWithPermission,
        });

        app.use(express.json());
        app.use(cors());
        app.use(cookieParser());
        app.use('/graphql', server);
        await sequelize.sync({ force: true });
        console.log('Connect to db successfully!!');

        app.listen(4000, () => console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}

main().catch((error) => console.log(`Error starting server: ${error}`));

const isAuthenticated = rule()(async (parent, args, { req }: Context, info) => {
    return !!req.header('Authorization');
});
