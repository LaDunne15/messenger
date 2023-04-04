import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { Chat } from "./chats.model";

@Table({tableName:'user_chats',createdAt:false,updatedAt:false})
export class UserChats extends Model<UserChats> {

    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
    id: number;

    @ForeignKey(()=>Chat)
    @Column({type:DataType.INTEGER})
    chatId: string; 

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId: string;
}