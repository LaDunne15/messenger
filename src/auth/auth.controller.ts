import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Реєстрація/Авторизація")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Реєстрація'})
    @Post('/registration')
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto);
    }

    @ApiOperation({summary: 'Авторизація'})
    @Post('/login')
    login(@Body() dto: CreateUserDto){
        return this.authService.login(dto);
    }

}
