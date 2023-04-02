import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto{

    @IsString({message: 'Повинно бути рядком'})
    @ApiProperty({example:"ADMIN", description:"Назва ролі"})
    readonly value: string;

    @IsNumber({},{message: 'Повинно бути число'})
    @ApiProperty({example:"5", description:"Ідентифікатор користувача"})
    readonly userId: number;
}