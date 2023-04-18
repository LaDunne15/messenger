import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { Roles } from 'src/auth/jwt-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddImageDto } from './dto/add-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChangeUserDto } from './dto/change-user.dto';
@ApiTags("Користувачі")
@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    
    @ApiOperation({summary: 'Створення користувача(неправильний)'})
    //@Roles("ADMIN")
    //@UseGuards(RolesGuard)
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


    @ApiBearerAuth()
    @ApiOperation({summary:'Додати/оновити світлину'})
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            sign: { type: 'string' },
            image: {
              type: 'string',
              format: 'binary',
            },
          },
        },
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    @Post('/image')
    addImgToAvatar(@Body() dto:AddImageDto,@UploadedFile() image,@Headers() headers) {
        return this.userService.addImgToAvatar(dto,image,headers);
    }

    @ApiBearerAuth()
    @ApiOperation({summary:'Мій профіль'})
    @UseGuards(JwtAuthGuard)
    @Get('/account')
    getMyAccount(@Headers() headers) {
      return this.userService.getMyAccount(headers);
    }

    @ApiBearerAuth()
    @ApiOperation({summary:'Змінити дані користувача'})
    @UseGuards(JwtAuthGuard)
    @Put('/user')
    changeUser(@Headers() headers,@Body() dto: ChangeUserDto){
      return this.userService.changeUser(headers,dto);
    }
    
    @ApiBearerAuth()
    @ApiOperation({summary:'Взяти зображення по параметру key'})
    //@UseGuards(JwtAuthGuard)
    @Get('/:value')
    getImageURLByKey(@Param('value') value:string) {
      return this.userService.getImageURLByKey(value);
    }
}
