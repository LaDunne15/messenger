import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class SendMessageDto {
    @ApiProperty({example:1, description:"Ідентифікатор чату"})
    @IsNumber({},{message: 'Повинно бути число'})
    readonly chat_id:number;
    
    @ApiProperty({example:"Привіт", description:"Текст повідомлення"})
    @IsString({message: 'Повинно бути рядком'})
    readonly text:string;
    
    @ApiProperty({example:null, description:"ідентифікатор повідомлення"})
    @IsNumber({},{message: 'Повинно бути число'})
    readonly reply:number;
}