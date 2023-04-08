import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class FileStorageObjectDto {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    file: Express.Multer.File;
  
    @ApiProperty({ required: false })
    comment?: string;
}

export class SendMessageFilesDto {
    @ApiProperty({example:1, description:"Ідентифікатор чату"})
    @IsNumber({},{message: 'Повинно бути число'})
    readonly chatId:number;
    
    @ApiProperty({example:"Привіт", description:"Текст повідомлення"})
    @IsString({message: 'Повинно бути рядком'})
    readonly text:string;
    
    @ApiProperty({example:null, description:"ідентифікатор повідомлення"})
    @IsNumber({},{message: 'Повинно бути число'})
    readonly reply:number;
    
    @ApiProperty({ type: [FileStorageObjectDto], required: true })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FileStorageObjectDto)
    files: FileStorageObjectDto[];

}