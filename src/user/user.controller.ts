import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { Roles } from 'src/auth/jwt-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags("Користувачі")
@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    
    @ApiOperation({summary: 'Створення користувача(неправильний)'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createUser(@Body() dto: CreateUserDto){
        return this.userService.createUser(dto);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: 'Отримати всіх користувачів'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiBearerAuth()
    @ApiOperation({summary: 'Видати роль користувачу'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        console.log(dto);
        return this.userService.addRole(dto);
    }


}
