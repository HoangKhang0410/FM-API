import { Field, ObjectType } from 'type-graphql';
import { Enroll } from '../models/Enroll';
import { IMutationResponse } from './MutationResponse';

@ObjectType({ implements: IMutationResponse })
export class EnrollResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field(() => [Enroll], { nullable: true })
    enrolls?: Enroll[];

    @Field({ nullable: true })
    enroll?: Enroll;
}
