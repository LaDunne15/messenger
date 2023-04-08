import { Column, DataType, Table, Model, BelongsToMany, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Chat } from "src/chats/chats.model";
import { Role } from "src/roles/roles.model";
import { User } from "src/user/user.model";
import { ImgMsg } from "./img-msg.model";

interface MsgCreationAttrs {
    chatId:number;
    userId:number;
    text:string;
}

@Table({tableName:'msgs'})
export class Msg extends Model<Msg, MsgCreationAttrs>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
    id:number;

    @ForeignKey(() => Chat)
    @Column({ type:DataType.INTEGER, field: 'chatId' })
    chatId: number;

    @BelongsTo(() => Chat, { foreignKey: 'chatId', as: 'fromChat' })
    chat: Chat;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER, field: 'userId'})
    userId:number;

    @BelongsTo(() => User)
    user: User;

    @Column({type: DataType.STRING, field: 'text'})
    text:string;

    @Column({type: DataType.INTEGER, field: 'reply'})
    reply:number;

    @HasMany(()=>ImgMsg, { as: 'img_messages' })
    messages: ImgMsg[];
}
