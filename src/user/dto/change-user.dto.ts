import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class ChangeUserDto {

    @ApiProperty({example:"LaDunne", description:"Логін користувача"})
    @IsString({message:'Повинно бути рядком'})
    readonly login: string;

    @ApiProperty({example:"Іван", description:"Ім'я користувача"})
    @IsString({message:'Повинно бути рядком'})
    readonly firstname: string;

    @ApiProperty({example:"Гончарюк", description:"Прізвище користувача"})
    @IsString({message:'Повинно бути рядком'})
    readonly lastname: string;

    @ApiProperty({example:"Чілю))", description:"Статус користувача"})
    @IsString({message:'Повинно бути рядком'})
    readonly status: string;
}