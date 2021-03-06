import { Optional, DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table, PrimaryKey } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import { Class } from './Class';
import { User } from './User';

interface EnrollAttributes {
    user_id: string;
    class_id: string;
}

interface EnrollCreationAttributes extends Optional<EnrollAttributes, 'user_id'> {}

@ObjectType()
@Table
export class Enroll extends Model<EnrollAttributes, EnrollCreationAttributes> {
    @Field()
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    user_id: string;

    @Field()
    @PrimaryKey
    @ForeignKey(() => Class)
    @Column
    class_id: string;
}
