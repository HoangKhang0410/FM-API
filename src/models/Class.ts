import { BelongsToMany, Column, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Optional, DataTypes } from 'sequelize';
import { User } from './User';
import { Enroll } from './Enroll';
import { Field, ObjectType } from 'type-graphql';

interface ClassAttributes {
    id: string;
    name: string;
    creatorId: string;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> {}

@ObjectType()
@Table
export class Class extends Model<ClassAttributes, ClassCreationAttributes> {
    @Field()
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @Field()
    @Column({ unique: true })
    name: string;

    @Field()
    @Column(DataTypes.UUID)
    creatorId: string;

    @BelongsToMany(() => User, () => Enroll)
    users: User[];
}
