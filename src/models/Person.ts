import { Table, Column, Model, Default, PrimaryKey, BelongsToMany } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';
import { Enroll } from './Enroll';
import { Class } from './Class';

interface PersonAttributes {
    id: string;
    name: string;
    role: 'student' | 'teacher';
}

interface PersonCreationAttributes extends Optional<PersonAttributes, 'id'> {}

@Table({ timestamps: true })
export class Person extends Model<PersonAttributes, PersonCreationAttributes> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @Column
    name: string;

    @Column
    role: 'student' | 'teacher';

    @BelongsToMany(() => Class, () => Enroll)
    classes: Class[];
}
