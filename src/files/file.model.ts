import { Column, DataType, Table, Model, BelongsToMany, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Chat } from "src/chats/chats.model";
import { Role } from "src/roles/roles.model";
import { User } from "src/user/user.model";

interface FileCreationAttrs {
    sign:string;
    url:string;
    userId:number;
}

@Table({tableName:'files'})
export class File extends Model<File, FileCreationAttrs>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
    id:number;

    @Column({type: DataType.STRING})
    sign:string;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER, field: 'user_id'})
    userId:number;

    @BelongsTo(() => User)
    user: User;

    @Column({type: DataType.STRING})
    url:string;
}
