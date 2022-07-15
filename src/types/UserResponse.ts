import { Field, ObjectType } from 'type-graphql';
import { User } from '../models/User';
import { IMutationResponse } from './MutationResponse';

@ObjectType({ implements: IMutationResponse })
export class UserResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({ nullable: true })
    user?: User;

    @Field(() => [User])
    users?: User[];

    @Field({ nullable: true })
    accessToken?: string;
}
