export const typeDefs = `
    type Query {
        hello: String
        people: [Person]
    }

    type Person {
        id: String!
        name: String
        role: String
    }
`;
