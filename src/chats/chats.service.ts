import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';
import { UserChats } from './user-chat.model';
import { Msg } from 'src/msg/msg.model';
import { ImgMsg } from 'src/msg/img-msg.model';
import { CreateGroupChatDto } from './dto/create-group-chat.dto';

@Injectable()
export class ChatsService {

    constructor(
        @InjectModel(Chat) private readonly chatRepository: typeof Chat,
        @InjectModel(User) private readonly userRepository: typeof User,
        @InjectModel(Msg) private readonly msgRepository: typeof Msg,
        @InjectModel(UserChats) private readonly userChatsRepository: typeof UserChats,
        private jwtService: JwtService
    ){}

    async createChat(dto: CreateChatDto, headers) {
        
        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];

        const jwt_user = this.jwtService.verify(token);
        
        const chat = await this.chatRepository.create(dto);

        const user = await this.userRepository.findByPk(dto.userId);
        const user2 = await this.userRepository.findByPk(jwt_user.id);

        await chat.$add("users",[user.id])
        await chat.$add("users",[user2.id])
        return chat;
    }

    
    async createGroupChat(dto, headers: any) {
        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];

        const jwt_user = this.jwtService.verify(token);
        
        const chat = await this.chatRepository.create({name:dto.name,type:'gr'});
        await chat.$add("users",[jwt_user.id]);

        for(const id of dto.usersIds) {
            await chat.$add("users",[id]);
        }
        
        return chat;
    }

    
    async getAllChats(headers) {
        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];
        const jwt_user = this.jwtService.verify(token);

        const user = await this.userRepository.findOne({
            where: { id:jwt_user.id },
            include: [Chat],
        });

        return user.chats;
    }
    
    async getChatById(headers: any, chatId: number) {
        
        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];
        const jwt_user = this.jwtService.verify(token);

        const chat = await Chat.findByPk(chatId, { include: [{
            model:Msg,
            include:[
                {
                    model:User
                },
                {
                    model:ImgMsg
                }
            ]
            }],
        });

        const chat2 = chat.messages.sort(function(a, b) {
            return a.updatedAt-b.updatedAt;
        });

        

        const chat3 = chat;
        chat3.messages = chat2;

        return chat3;
    }
}
