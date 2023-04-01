import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example:"email@gmail.com", description:"Потенційна пошта користувача"})
    readonly email: string;
    @ApiProperty({example:"password123", description:"Потенційний пароль користувача"})
    readonly password: string;
}