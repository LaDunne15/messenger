import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddImageDto } from './dto/add-image.dto';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/file.model';
import { JwtService } from '@nestjs/jwt';
import { ChangeUserDto } from './dto/change-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService,
        @InjectModel(File) private fileRepository: typeof File,
        private fileService: FilesService,
        private jwtService: JwtService
    ){}

    async createUser(dto: CreateUserDto)
    {
        const user = await this.userRepository.create(dto); 
        const role = await this.rolesService.getRoleByValue("USER");
        await user.$set("roles", [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include:{all:true}});
        return users;
    }


    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where:{email}, include:{all:true}})
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.value);
        if (user && role){
            await user.$add('role',role.id);
            return dto;
        }
        throw new HttpException('Користувач чи роль не знайдені',HttpStatus.NOT_FOUND);
    }

    async addImgToAvatar(dto: AddImageDto, image: any,headers) {
        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];
        const jwt_user = this.jwtService.verify(token);

        const fileName = await this.fileService.createFile(image);
        const file = await this.fileRepository.create({...dto, url: fileName,userId:jwt_user.id});
        const user = await this.userRepository.findByPk(jwt_user.id);
        user.url_img=fileName;
        await user.save();
        return file;
    }
    
    async getMyAccount(headers: any) {
        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];
        const jwt_user = this.jwtService.verify(token);
        /*const user = await this.userRepository.findByPk(jwt_user.id, { include: [{
            model:File,
        }], });*/
        const user = await this.userRepository.findByPk(jwt_user.id);
        user.url_img = user.url_img? await this.fileService.getFileURLByKey(user.url_img):null;
        return user;
    }

    
    async getUserImages(headers: any) {
        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];
        const jwt_user = this.jwtService.verify(token);
        const user = await this.userRepository.findByPk(jwt_user.id, { include: [{
            model:File,
        }], });
        user.url_img = user.url_img? await this.fileService.getFileURLByKey(user.url_img):null;

        const imgs = user.imgs.sort(function(a, b) {
            return b.updatedAt-a.updatedAt;
        });

        imgs.forEach(async (i)=>{
            i.url = await this.fileService.getFileURLByKey(i.url);
        })

        return imgs;
    }

    
    async changeUser(headers: any, dto: ChangeUserDto) {
        const authHeader = headers.authorization;
        const token = authHeader.split(' ')[1];
        const jwt_user = this.jwtService.verify(token);
        const user = await this.userRepository.findByPk(jwt_user.id);

        user.login = dto.login;
        user.status = dto.status;
        user.firstname = dto.firstname;
        user.lastname = dto.lastname;

        await user.save();
        return await this.userRepository.findByPk(jwt_user.id);
    }
    
    async getImageURLByKey(value: string){
        return this.fileService.getFileURLByKey(value);
    }

}
