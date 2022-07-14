// import { GraphQLFieldResolver } from 'graphql';
// import { Person } from '../models/Person';
// export const resolvers = {
//     Query: {
//         people: async () => {
//             const persons: Person[] = await Person.findAll();
//             return persons;
//         },
//     },
//     Mutation: {
//         register: async (param1: ParentNode, param2: Args, param3): Promise<Person> => {
//             const person: Person = await Person.findOne({ where: { $id$: '1' } });
//             console.log(param1);
//             console.log(param2);
//             console.log(param3);
//             return person;
//         },
//     },
// };

import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User as UserSchema } from '../schema/user';
import { User as UserModel } from '../models/User';
import { RegisterInput } from '../types/RegisterInput';
import argon2 from 'argon2';
import { UserMutationResponse } from '../types/UserMutationResponse';
import { LoginInput } from '../types/LoginInput';
import { Context } from '../types/Context';
import { createToken, sendRefreshToken } from '../utils/auth';

@Resolver(() => UserModel)
export class UserResolver {
    @Query(() => [UserModel])
    async getUsers(): Promise<UserModel[]> {
        const users: UserModel[] = await UserModel.findAll();
        return users;
    }

    @Mutation(() => UserMutationResponse)
    async register(
        @Arg('registerInput')
        registerInput: RegisterInput
    ): Promise<UserMutationResponse> {
        const { name, username, password, role } = registerInput;
        const existingUser = await UserModel.findOne({ where: { username: username } });
        if (existingUser !== null) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated username',
            };
        } else {
            const hashedPassword = await argon2.hash(password);
            const newUser = await UserModel.create({ name, username, password: hashedPassword, role });
            return {
                code: 201,
                success: true,
                message: 'Register successfully!',
                user: newUser,
            };
        }
    }
    @Mutation(() => UserMutationResponse)
    async login(
        @Arg('loginInput') { username, password }: LoginInput,
        @Ctx() { res }: Context
    ): Promise<UserMutationResponse> {
        const existingUser = await UserModel.findOne({ where: { username: username } });
        if (existingUser === null) {
            return {
                code: 400,
                success: false,
                message: 'User not found',
            };
        }
        const isPasswordValid = await argon2.verify(existingUser.password, password);
        if (!isPasswordValid) {
            return {
                code: 400,
                success: false,
                message: 'Incorrect password',
            };
        }
        sendRefreshToken(res, existingUser);
        return {
            code: 200,
            success: true,
            message: 'Login successfully!',
            user: existingUser,
            accessToken: createToken('accessToken', existingUser),
        };
    }
}
