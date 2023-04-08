import { Body, Controller, Get, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { MsgService } from './msg.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Headers } from '@nestjs/common';
import { SendMessageDto } from './dto/send-msg.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SendMessageFilesDto } from './dto/send-msg-files.dto';


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

    @ApiBearerAuth()
    @ApiOperation({summary:'Відправити повідомлення користувачу з файлами'})
    @ApiBody({
        type: 'multipart/form-data',
        required: true,
        schema: {
          type: 'object',
          properties: {
            chatId: { type: 'integer' },
            text: { type: 'string' },
            reply: { type: 'integer'},
            files: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'binary',
                },
            },
          },
        },
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(JwtAuthGuard)
    @Post('/sendMsgFiles')
    addImgToAvatar(@Body() dto:SendMessageFilesDto,@UploadedFiles() files,@Headers() headers) {
        return this.userService.sendMsgWithFiles(JSON.parse(JSON.stringify(dto)),headers,files)
    }


}
