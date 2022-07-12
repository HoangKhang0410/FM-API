import { createServer } from '@graphql-yoga/node';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema/schema';
import { resolvers } from './resolvers/hello';
import { sequelize } from './db/db';

const server = createServer({
    schema: makeExecutableSchema({
        typeDefs,
        resolvers,
    }),
});

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connect to db successfully!');
        server.start();
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}

main();
