import { Column, DataType, Table, Model, BelongsToMany, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Chat } from "src/chats/chats.model";
import { Role } from "src/roles/roles.model";
import { User } from "src/user/user.model";
import { Msg } from "./msg.model";

interface ImgMsgCreationAttrs {
    url:string,
    msgId:number
}

@Table({tableName:'imgs_msg'})
export class ImgMsg extends Model<ImgMsg, ImgMsgCreationAttrs>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
    id:number;

    @ForeignKey(()=>Msg)
    @Column({type: DataType.INTEGER, field: 'msgId'})
    msgId:number;

    @BelongsTo(() => Msg)
    msg: Msg;

    @Column({type: DataType.STRING})
    url:string;

}