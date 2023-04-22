import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateChatWithTextDto {

    @ApiProperty({example:"Чатик)))", description:"Назва чату"})
    readonly name: string;

    @IsNumber({},{message: 'Повинно бути число'})
    @ApiProperty({example:"5", description:"Ідентифікатор користувача"})
    readonly userId: number;

    @ApiProperty({example:"Привіт", description:"Текст користувача"})
    readonly text: string;
}