export const typeDefs = `
    type Query {
        hello: String
        people: [Person]
    }

    type Person {
        id: String!
        name: String
        username: String!
        password: String!
        role: String
    }

    type Mutation {
        register(username: String, password: String, name: String, role: String): Person
    }
`;
