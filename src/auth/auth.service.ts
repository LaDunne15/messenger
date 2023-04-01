import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private userService: UserService,private jwtService: JwtService){}

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate){
            throw new HttpException('Користувач з таким email вже існує',HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password,5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return user;
    }

    
    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id}
        return {
            token: this.jwtService.sign(payload) 
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некоректна пошта чи пароль'});
    }
}
