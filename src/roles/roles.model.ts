import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName:'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

    @ApiProperty({example: '1', description:'Унікальний індетифікатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description:'Унікальне значення ролі'})
    @Column({type:DataType.STRING, unique:true, allowNull:false})
    value: string;

    @ApiProperty({example: 'Адміністратор', description:'Опис ролі'})
    @Column({type:DataType.STRING, allowNull:false})
    description: string;

    @BelongsToMany(()=>User,()=>UserRoles)
    users: User[];
}