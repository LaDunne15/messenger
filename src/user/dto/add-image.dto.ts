import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddImageDto{

    @IsString({message: 'Повинно бути рядком'})
    @ApiProperty({example:"В парку, відпочиваєм))", description:"Опис фото"})
    readonly sign: string;
}