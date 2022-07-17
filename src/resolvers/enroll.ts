import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { verifyToken } from '../middlewares/auth';
import { Enroll as EnrollModel } from '../models/Enroll';
import { Context } from '../types/Context';
import { EnrollResponse } from '../types/EnrollResponse';
import { Class as ClassModel } from '../models/Class';
import { enrollClassMiddleware } from '../middlewares/checkRole';
@Resolver(() => EnrollModel)
export class EnrollResolver {
    @UseMiddleware([verifyToken, enrollClassMiddleware])
    @Mutation(() => EnrollResponse)
    async enrollClass(@Arg('classId') classId: string, @Ctx() { user }: Context): Promise<EnrollResponse> {
        try {
            const existingClass = await ClassModel.findOne({ where: { id: classId } });
            if (existingClass === null) {
                return {
                    code: 400,
                    success: false,
                    message: 'Class not found',
                };
            }
            const newEnroll = await EnrollModel.create({ user_id: user.userId, class_id: classId });
            return {
                code: 200,
                success: true,
                message: 'Create enroll successfully',
                enroll: newEnroll,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: `Error when creating enroll, ${error}`,
            };
        }
    }
}
