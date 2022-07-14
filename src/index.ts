import { createServer } from '@graphql-yoga/node';
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema/schema';
import { resolvers } from './resolvers/Person';
import { sequelize } from './db/db';

const app: Express = express();

const server = createServer({
    schema: makeExecutableSchema({
        typeDefs,
        resolvers,
    }),
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/graphql', server);

async function main() {
    try {
        await sequelize.sync({ force: true });
        console.log('Connect to db successfully!!');
        app.listen(4000, () => console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}

main().catch((error) => console.log(`Error starting server: ${error}`));
