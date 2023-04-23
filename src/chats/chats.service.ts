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
import { CreateChatWithTextDto } from './dto/create-chat-with-text.dto';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ChatsService {

    constructor(
        @InjectModel(Chat) private readonly chatRepository: typeof Chat,
        @InjectModel(User) private readonly userRepository: typeof User,
        @InjectModel(Msg) private readonly msgRepository: typeof Msg,
        private fileService: FilesService,
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
    
    async createChatWithText(dto: CreateChatWithTextDto, headers: any) {
        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];
        const jwt_user = this.jwtService.verify(token);
        const user = await this.userRepository.findByPk(dto.userId);
        const user2 = await this.userRepository.findByPk(jwt_user.id);

        const chats = await this.chatRepository.findAll({
            include: {
                model: User
            },
            where: {
                type:'ind',
            }
        });

        let filtered = [];

        await chats.forEach((i)=>{
            let s = 0;
            i.users.forEach((j)=>{
                if(j.id===user.id||j.id===user2.id)
                {
                    s++;
                }
            })
            if(s==2){
                filtered.push(i);
            }
        })

        let chat;
        if(filtered.length!==0)
        {
            chat = await this.chatRepository.findByPk(filtered[0].id)
        }
        else 
        {
            chat = await this.chatRepository.create(dto);
            await chat.$add("users",[user.id]);
            await chat.$add("users",[user2.id]);    
        }
        await this.msgRepository.create({
            userId: jwt_user.id,
            chatId: chat.id,
            text: dto.text
        });

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
            include: [{
                model: Chat,
                include: [
                    {
                        model: Msg
                    },
                    {
                        model: User
                    }
                ]
            }],
        });

        let chats = [];

        await user.chats.forEach(async (chat) => {
            chat.messages = await chat.messages.sort(function(a, b) {
                return b.updatedAt-a.updatedAt;
            });
            const chJSON = JSON.stringify(chat);

            const _chat = JSON.parse(chJSON);
            _chat.last_text = chat.messages[0].text;
            _chat.last_change = chat.messages[0].updatedAt;
            _chat.isYouLastSender = chat.messages[0].userId===jwt_user.id;
            let notMe = chat.users[0].id==jwt_user.id?chat.users[1]:chat.users[0];
            _chat.img_url = await user.url_img ? await this.fileService.getFileURLByKey(notMe.url_img) : null;
            _chat.user = notMe;
            _chat.users = [];
            _chat.messages = [];
            chats.push(_chat);
        })

        await chats.sort(function(a, b) {
                return a.last_change-b.last_change;
        });

        return chats;
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
