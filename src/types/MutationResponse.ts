import { GraphQLYogaError } from '@graphql-yoga/node';
import { Field, InterfaceType } from 'type-graphql';

@InterfaceType()
export class IMutationResponse {
    @Field()
    code: number;

    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;
}
