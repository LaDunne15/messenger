import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { Role } from 'src/roles/roles.model';
import { Msg } from 'src/msg/msg.model';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([User,Role,UserRoles,Msg]),
    RolesModule,
    forwardRef(()=>AuthModule)
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
