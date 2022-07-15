import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { verifyToken } from '../middlewares/auth';
import { checkRole } from '../middlewares/checkRole';
import { Class as ClassModel } from '../models/Class';
import { ClassResponse } from '../types/ClassResponse';
import { Context } from '../types/Context';

@Resolver(() => ClassModel)
export class ClassResolver {
    @Query(() => ClassResponse)
    @UseMiddleware(verifyToken)
    async getClassInfo(@Arg('classId') classId: string): Promise<ClassResponse> {
        const classInfo = await ClassModel.findOne({ where: { id: classId } });
        if (classInfo === null) {
            return {
                code: 400,
                success: false,
                message: 'Class not found',
            };
        } else {
            return {
                code: 200,
                success: true,
                message: 'Get class successfully',
                class: classInfo,
            };
        }
    }

    @Query(() => ClassResponse)
    @UseMiddleware(verifyToken)
    async getClasses(): Promise<ClassResponse> {
        const classes = await ClassModel.findAll();
        return {
            code: 200,
            success: true,
            message: 'Get classes successfully',
            classes: classes,
        };
    }

    @Mutation(() => ClassResponse)
    @UseMiddleware([verifyToken, checkRole])
    async createClasses(@Arg('className') className: string, @Ctx() { user }: Context): Promise<ClassResponse> {
        const existingClass = await ClassModel.findOne({ where: { name: className } });
        if (existingClass !== null) {
            return {
                code: 400,
                success: false,
                message: 'Duplicate class name',
            };
        }
        const newClass = await ClassModel.create({ name: className, creatorId: user.userId });
        return {
            code: 201,
            success: true,
            message: 'Create class successfully',
            class: newClass,
        };
    }
}
