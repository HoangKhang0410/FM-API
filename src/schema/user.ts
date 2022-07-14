import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
export class User {
    @Field()
    id: string;
    @Field()
    name!: string;
    @Field()
    username!: string;
    @Field()
    password!: string;
    @Field()
    role!: 'student' | 'teacher';
}
