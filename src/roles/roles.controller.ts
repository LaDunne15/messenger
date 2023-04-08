import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/jwt-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags("Ролі")
@Controller('roles')
export class RolesController {

    constructor (private roleService: RolesService){}

    
    @ApiBearerAuth()
    @ApiOperation({summary: 'Створення ролі'})
    //@Roles("ADMIN")
    //@UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    } 
    
    @ApiBearerAuth()
    @ApiOperation({summary: 'Детальний опис ролі'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/:value')
    getByValue(@Param('value') value:string) {
        return this.roleService.getRoleByValue(value);
    }
}
