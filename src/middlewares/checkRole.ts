import { AuthChecker, MiddlewareFn } from 'type-graphql';
import { Context } from '../types/Context';
import { User as UserModel } from '../models/User';
import { GraphQLYogaError } from '@graphql-yoga/node';
import { Enroll as EnrollModel } from '../models/Enroll';
import { Op } from 'sequelize';

export const createClassMiddleware: MiddlewareFn<Context> = async ({ context }, next) => {
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

export const enrollClassMiddleware: MiddlewareFn<Context> = async ({ args, context }, next) => {
    try {
        const currentUser = await UserModel.findOne({ where: { id: context.user.userId } });
        console.log(args);
        if (currentUser) {
            const isEnrollClass = await EnrollModel.findAll({
                where: {
                    [Op.and]: [{ class_id: args.classId }, { user_id: currentUser.id }],
                },
            });
            if (isEnrollClass.length !== 0) {
                throw new GraphQLYogaError('Student has already enrolled this class');
            }

            const currentUserRole = currentUser.role;
            if (currentUserRole === 'teacher') {
                throw new GraphQLYogaError('Teacher cannot enroll class');
            }
        }

        return next();
    } catch (error) {
        throw new GraphQLYogaError(`Error when checking role: ${error}`);
    }
};
