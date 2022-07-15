import { Query, Resolver, Mutation, Arg, Ctx, UseMiddleware, Args } from 'type-graphql';
import { User as UserModel } from '../models/User';
import { RegisterInput } from '../types/RegisterInput';
import argon2 from 'argon2';
import { UserResponse } from '../types/UserResponse';
import { LoginInput } from '../types/LoginInput';
import { Context } from '../types/Context';
import { createToken, sendRefreshToken } from '../utils/auth';
import { verifyToken } from '../middlewares/auth';

@Resolver(() => UserModel)
export class UserResolver {
    @Query(() => UserResponse)
    @UseMiddleware(verifyToken)
    async getUsers(@Ctx() { user }: Context): Promise<UserResponse> {
        console.log(user);
        const users = await UserModel.findAll();
        return {
            code: 200,
            success: true,
            message: 'Get users successfully',
            users: users,
        };
    }

    @Query(() => UserResponse)
    @UseMiddleware(verifyToken)
    async getUserInfo(@Arg('userId') userId: string): Promise<UserResponse> {
        const currentUser = await UserModel.findOne({ where: { id: userId } });
        if (!currentUser) {
            return {
                code: 400,
                success: false,
                message: 'User not found',
            };
        }
        return {
            code: 200,
            success: true,
            message: 'Get User successfully',
            user: currentUser,
        };
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('registerInput')
        registerInput: RegisterInput
    ): Promise<UserResponse> {
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
    @Mutation(() => UserResponse)
    async login(@Arg('loginInput') { username, password }: LoginInput, @Ctx() { res }: Context): Promise<UserResponse> {
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
