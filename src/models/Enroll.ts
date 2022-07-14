import { Optional, DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, BelongsToMany, Table, PrimaryKey } from 'sequelize-typescript';
import { Class } from './Class';
import { User } from './User';

interface EnrollAttributes {
    person_id: string;
    class_id: string;
}

interface EnrollCreationAttributes extends Optional<EnrollAttributes, 'person_id'> {}

@Table
export class Enroll extends Model<EnrollAttributes, EnrollCreationAttributes> {
    @ForeignKey(() => User)
    @PrimaryKey
    @Column
    user_id: string;

    @ForeignKey(() => Class)
    @PrimaryKey
    @Column
    class_id: string;
}
