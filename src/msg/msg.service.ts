import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from 'src/chats/chats.model';
import { UserChats } from 'src/chats/user-chat.model';
import { User } from 'src/user/user.model';
import { SendMessageDto } from './dto/send-msg.dto';
import { Msg } from './msg.model';
import { FilesService } from 'src/files/files.service';
import { ImgMsg } from './img-msg.model';

@Injectable()
export class MsgService {
    constructor(
        @InjectModel(Chat) private readonly chatRepository: typeof Chat,
        @InjectModel(User) private readonly userRepository: typeof User,
        @InjectModel(Msg) private readonly msgRepository: typeof Msg,
        @InjectModel(ImgMsg) private readonly imgMsgRepository: typeof ImgMsg,
        @InjectModel(UserChats) private readonly userChatsRepository: typeof UserChats,
        private fileService: FilesService,
        private jwtService: JwtService
    ){}

    async sendMsg(dto:SendMessageDto,headers){

        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];
        const jwt_user = this.jwtService.verify(token);

        const msg = await this.msgRepository.create({
            ...dto,
            userId: jwt_user.id,
        });
        
        return msg;
    }

    async sendMsgWithFiles(dto,headers,files){
        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];
        const jwt_user = this.jwtService.verify(token);

        console.log(dto);

        const msg = await this.msgRepository.create({
            userId: jwt_user.id,
            chatId: dto.chatId,
            text: dto.text
        });
        
        for (const file of files) {
            const fileName = await this.fileService.createFile(file);
            const imgMsg = await this.imgMsgRepository.create({ url: fileName, msgId: msg.id });
        }

        return msg;
    }
}
