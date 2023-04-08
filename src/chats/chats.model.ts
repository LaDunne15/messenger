import { Column, DataType, Table, Model, BelongsToMany, HasMany} from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { User } from "src/user/user.model";
import { UserChats } from "./user-chat.model";
import { Msg } from "src/msg/msg.model";

enum Type {
    IND = 'ind',
    GR = 'gr',
}

interface ChatCreationAttrs {
    name: string;
    type: string;
}

@Table({tableName:'chats'}) 
export class Chat extends Model<Chat, ChatCreationAttrs>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
    id:number;

    @Column({type: DataType.STRING})
    name:string;

    @Column({type: DataType.ENUM(...Object.values(Type)), defaultValue: Type.IND})
    type!:Type;  

    @BelongsToMany(()=>User,()=>UserChats)
    users: User[]; 

    @HasMany(()=>Msg, { as: 'messages' })
    messages: Msg[];
}