import { Field, InputType } from 'type-graphql';

@InputType()
export class ClassInput {
    @Field()
    id!: string;

    @Field()
    name!: string;
}
