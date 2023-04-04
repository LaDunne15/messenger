import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { Role } from './roles/roles.model';
import { ChatsModule } from './chats/chats.module';
import { Chat } from './chats/chats.model';
import { UserChats } from './chats/user-chat.model';
import { MsgModule } from './msg/msg.module';
import { Msg } from './msg/msg.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User,Role,UserRoles,Chat,UserChats,Msg],
      autoLoadModels: true,
      protocol: 'postgres',
      dialectOptions: {
        ssl: true,
        native:true
      }
    }),
    UserModule,
    AuthModule,
    RolesModule,
    ChatsModule,
    MsgModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
