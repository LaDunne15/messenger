import { Post } from "@nestjs/common";
import { DateTime } from "aws-sdk/clients/devicefarm";
import { Column, DataType, Table, Model, BelongsToMany, HasMany} from "sequelize-typescript";
import { Chat } from "src/chats/chats.model";
import { UserChats } from "src/chats/user-chat.model";
import { File } from "src/files/file.model";
import { Msg } from "src/msg/msg.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName:'users'}) 
export class User extends Model<User, UserCreationAttrs>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
    id:number;

    @Column({type: DataType.STRING, unique:true,allowNull:false})
    email:string;

    @Column({type: DataType.STRING, unique:true})
    login:string;

    @Column({type:DataType.STRING})
    firstname:string;

    @Column({type:DataType.STRING})
    lastname:string;

    @Column({type:DataType.STRING, allowNull:false})
    password:string;

    @Column({type:DataType.STRING})
    url_img:string;

    @Column({type:DataType.STRING})
    status:string;

    @Column({type:DataType.DATE})
    last_active:DateTime; 

    @BelongsToMany(()=>Role,()=>UserRoles)
    roles: Role[];

    @BelongsToMany(()=>Chat,()=>UserChats)
    chats: Chat[];

    @HasMany(() => Msg)
    msgs: Msg[];

    @HasMany(() => File)
    imgs: File[];
}