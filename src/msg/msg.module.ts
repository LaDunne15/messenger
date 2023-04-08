import { Module, forwardRef } from '@nestjs/common';
import { MsgService } from './msg.service';
import { MsgController } from './msg.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserChats } from 'src/chats/user-chat.model';
import { User } from 'src/user/user.model';
import { Chat } from 'src/chats/chats.model';
import { Msg } from './msg.model';
import { ImgMsg } from './img-msg.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [MsgService],
  controllers: [MsgController],
  imports: [    
    SequelizeModule.forFeature([Chat,User,UserChats,Msg,ImgMsg]),
    RolesModule,
    FilesModule,
    forwardRef(()=>AuthModule)
  ]
})
export class MsgModule {}
