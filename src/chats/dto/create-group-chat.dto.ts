import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class CreateGroupChatDto {
    @ApiProperty({example:"Чатик)))", description:"Назва чату"})
    readonly name: string;
    @IsNumber({},{message: 'Повинно бути число'})
    @IsArray()
    @ApiProperty({type:[Number], example:[2,3], description:"Ідентифікатори користувачів"})
    readonly usersIds: number;
}