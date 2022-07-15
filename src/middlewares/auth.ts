import { GraphQLYogaError } from '@graphql-yoga/node';
import { Secret, verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types/Context';
import { UserAuthPayload } from '../types/UserAuthPayload';

export const verifyToken: MiddlewareFn<Context> = ({ context }, next) => {
    try {
        const authHeader = context.req.header('Authorization');
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken) {
            throw new GraphQLYogaError('Not Authorized!');
        }
        const decodedUser = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as UserAuthPayload;
        context.user = decodedUser;
        return next();
    } catch (error) {
        throw new GraphQLYogaError(`Error when authenticating user, ${error}`);
    }
};
