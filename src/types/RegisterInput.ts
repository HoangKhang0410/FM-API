import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterInput {
    @Field()
    name!: string;
    @Field()
    username!: string;
    @Field()
    password!: string;
    @Field()
    role!: 'student' | 'teacher';
}
