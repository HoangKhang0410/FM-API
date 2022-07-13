import { Person } from '../models/Person';
export const resolvers = {
    Query: {
        people: async () => {
            const persons: Person[] = await Person.findAll();
            return persons;
        },
    },
};
