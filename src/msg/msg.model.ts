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

    @ForeignKey(() => Chat)
    @Column({ type:DataType.INTEGER, field: 'chat_id' })
    chatId: number;

    @BelongsTo(() => Chat, { foreignKey: 'chatId', as: 'fromChat' })
    chat: Chat;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER, field: 'user_id'})
    userId:number;

    @BelongsTo(() => User)
    user: User;

    @Column({type: DataType.STRING, field: 'text'})
    text:string;

    @Column({type: DataType.INTEGER, field: 'reply'})
    reply:number;
}
