import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example:"USER", description:"Назва ролі"})
    readonly value: string;
    @ApiProperty({example:"Звичайний користувач", description:"Опис ролі"})
    readonly description: string;
}