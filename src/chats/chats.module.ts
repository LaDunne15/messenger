import { Module, forwardRef } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { User } from 'src/user/user.model';
import { UserChats } from './user-chat.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Msg } from 'src/msg/msg.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [ChatsService],
  controllers: [ChatsController],
  imports: [
    SequelizeModule.forFeature([Chat,User,UserChats,Msg]),
    RolesModule,
    FilesModule,
    forwardRef(()=>AuthModule)
  ],
  exports: [
    ChatsService
  ]
})
export class ChatsModule {}
