import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags("Чати")
@Controller('chats')
export class ChatsController {
    constructor (private chatService: ChatsService){}

    @ApiBearerAuth()
    @ApiOperation({summary:"Створення одинарного чату"})
    @UseGuards(JwtAuthGuard)
    @Post('')
    createIndChat(@Headers() headers,@Body() dto: CreateChatDto) {
        return this.chatService.createChat(dto,headers);
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"Виведення списку всіх чатів"})
    @UseGuards(JwtAuthGuard)
    @Get('')
    getAllChats(@Headers() headers) {
        return this.chatService.getAllChats(headers);
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"Виведення повідомлень певного чату"})
    @UseGuards(JwtAuthGuard)
    @Get('/:value')
    getChatById(@Headers() headers,@Param('value') value:number) {
        return this.chatService.getChatById(headers,value);
    }
}

