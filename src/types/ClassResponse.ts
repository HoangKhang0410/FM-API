import { GraphQLYogaError } from '@graphql-yoga/node';
import { Field, ObjectType } from 'type-graphql';
import { Class } from '../models/Class';
import { IMutationResponse } from './MutationResponse';

@ObjectType({ implements: IMutationResponse })
export class ClassResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({ nullable: true })
    class?: Class;

    @Field(() => [Class], { nullable: true })
    classes?: Class[];
}
