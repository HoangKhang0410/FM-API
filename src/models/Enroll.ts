import { Optional, DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, BelongsToMany, Table, PrimaryKey } from 'sequelize-typescript';
import { Class } from './Class';
import { Person } from './Person';

interface EnrollAttributes {
    person_id: string;
    class_id: string;
}

interface EnrollCreationAttributes extends Optional<EnrollAttributes, 'person_id'> {}

@Table
export class Enroll extends Model<EnrollAttributes, EnrollCreationAttributes> {
    @ForeignKey(() => Person)
    @PrimaryKey
    @Column
    person_id: string;

    @ForeignKey(() => Class)
    @PrimaryKey
    @Column
    class_id: string;
}
