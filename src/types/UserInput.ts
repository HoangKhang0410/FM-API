import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
    @Field()
    id!: string;

    @Field()
    name!: string;

    @Field()
    role!: 'student' | 'teacher';
}
