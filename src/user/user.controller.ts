import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    createUser(@Body() dto: CreateUserDto){
        return this.userService.createUser(dto);
    }


}
