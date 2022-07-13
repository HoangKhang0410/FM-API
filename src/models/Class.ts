import { BelongsToMany, Column, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Optional, DataTypes } from 'sequelize';
import { Person } from './Person';
import { Enroll } from './Enroll';

interface ClassAttributes {
    id: string;
    name: string;
    creatorId: string;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> {}

@Table
export class Class extends Model<ClassAttributes, ClassCreationAttributes> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @Column
    name: string;

    @Column(DataTypes.UUID)
    creatorId: string;

    @BelongsToMany(() => Person, () => Enroll)
    persons: Person[];
}
