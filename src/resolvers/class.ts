import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { verifyToken } from '../middlewares/auth';
import { createClassMiddleware } from '../middlewares/checkRole';
import { Class as ClassModel } from '../models/Class';
import { ClassInput } from '../types/ClassInput';
import { ClassResponse } from '../types/ClassResponse';
import { Context } from '../types/Context';

@Resolver(() => ClassModel)
export class ClassResolver {
    @Query(() => ClassResponse)
    @UseMiddleware(verifyToken)
    async getClassInfo(@Arg('classId') classId: string): Promise<ClassResponse> {
        try {
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
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: `Error when getting class info, ${error}`,
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

    // Also create Enroll
    @Mutation(() => ClassResponse)
    @UseMiddleware([verifyToken, createClassMiddleware])
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
    @Mutation(() => ClassResponse)
    @UseMiddleware(verifyToken)
    async deleteClassInfo(@Arg('classId') classId: string): Promise<ClassResponse> {
        try {
            const existingClass = await ClassModel.findOne({ where: { id: classId } });
            if (existingClass === null) {
                return {
                    code: 400,
                    success: false,
                    message: 'Class not found',
                };
            }
            await ClassModel.destroy({ where: { id: classId } });
            return {
                code: 200,
                success: true,
                message: 'Delete class successfully',
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: `Error when deleting class, ${error}`,
            };
        }
    }
    @Mutation(() => ClassResponse)
    @UseMiddleware(verifyToken)
    async updateClassInfo(@Arg('classInput') classInput: ClassInput): Promise<ClassResponse> {
        try {
            const existingClass = await ClassModel.findOne({ where: { id: classInput.id } });
            if (existingClass === null) {
                return {
                    code: 400,
                    success: false,
                    message: 'Class not found',
                };
            }
            const [_, updatedClasses] = await ClassModel.update(
                { name: classInput.name },
                { where: { id: classInput.id }, returning: true }
            );

            return {
                code: 200,
                success: true,
                message: 'Update class successfully',
                class: updatedClasses[0],
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: `Error when updating class, ${error}`,
            };
        }
    }
}
