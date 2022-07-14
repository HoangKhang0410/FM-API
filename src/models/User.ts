import { Table, Column, Model, Default, PrimaryKey, BelongsToMany } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';
import { Enroll } from './Enroll';
import { Class } from './Class';
import { Field, ObjectType } from 'type-graphql';

interface UserAttributes {
    id: string;
    name: string;
    username: string;
    password: string;
    role: 'student' | 'teacher';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@ObjectType()
@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Field()
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id!: string;

    @Field()
    @Column
    name!: string;

    @Field()
    @Column({ unique: true })
    username!: string;

    // @Field()
    @Column
    password!: string;

    @Field()
    @Column
    role!: 'student' | 'teacher';

    @BelongsToMany(() => Class, () => Enroll)
    classes: Class[];
}
