import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types/Context';
import { User as UserModel } from '../models/User';
import { GraphQLYogaError } from '@graphql-yoga/node';

export const checkRole: MiddlewareFn<Context> = async ({ context }, next) => {
    try {
        const currentUser = await UserModel.findOne({ where: { id: context.user.userId } });
        const currentUserRole = currentUser && currentUser.role;
        if (currentUserRole === 'student') {
            throw new GraphQLYogaError('Student cannot create class');
        }
        return next();
    } catch (error) {
        throw new GraphQLYogaError(`Error when checking role: ${error}`);
    }
};
