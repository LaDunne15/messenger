import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MsgService } from './msg.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Headers } from '@nestjs/common';
import { SendMessageDto } from './dto/send-msg.dto';


@ApiTags("Повідомлення")
@Controller('msg')
export class MsgController {

    
    constructor(private userService: MsgService){}

    @ApiBearerAuth()
    @ApiOperation({summary:"Відправити повідомлення користувачу"})
    @UseGuards(JwtAuthGuard)
    @Post('/sendMsg')
    sendMsg(@Headers() headers,@Body() dto: SendMessageDto) {
        return this.userService.sendMsg(dto,headers);
    }


}
