import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from 'src/chats/chats.model';
import { UserChats } from 'src/chats/user-chat.model';
import { User } from 'src/user/user.model';
import { SendMessageDto } from './dto/send-msg.dto';
import { Msg } from './msg.model';

@Injectable()
export class MsgService {
    constructor(
        @InjectModel(Chat) private readonly chatRepository: typeof Chat,
        @InjectModel(User) private readonly userRepository: typeof User,
        @InjectModel(Msg) private readonly msgRepository: typeof Msg,
        @InjectModel(UserChats) private readonly userChatsRepository: typeof UserChats,
        private jwtService: JwtService
    ){}

    async sendMsg(dto:SendMessageDto,headers){

        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];
        const jwt_user = this.jwtService.verify(token);

        const msg = this.msgRepository.create({
            ...dto,
            user_id: jwt_user.id,
        });
        
          // Зберігаємо новий об'єкт повідомлення в базі даних
        return msg;
    }
}
