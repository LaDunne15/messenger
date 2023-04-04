import { Column, DataType, Table, Model, BelongsToMany, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Chat } from "src/chats/chats.model";
import { Role } from "src/roles/roles.model";
import { User } from "src/user/user.model";

interface MsgCreationAttrs {
    chat_id:number;
    user_id:number;
    text:string;
}

@Table({tableName:'msgs'})
export class Msg extends Model<Msg, MsgCreationAttrs>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
    id:number;

    @Column({type: DataType.INTEGER})
    chat_id:number;

    @Column({type: DataType.INTEGER})
    user_id:number;

    @Column({type: DataType.STRING})
    text:string;

    @Column({type: DataType.INTEGER})
    reply:number;

    @ForeignKey(() => Chat)
    @Column({ type:DataType.INTEGER })
    chatId: number;

    @BelongsTo(() => Chat, { foreignKey: 'chatId', as: 'fromChat' })
    chat: Chat;
}