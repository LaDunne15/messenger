import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import * as fs  from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    constructor(
        @Inject(S3) private readonly s3: S3
    ) {}

    bucketName = process.env.BUCKET_NAME;
    region = process.env.REGION;

    async createFile(file): Promise<string>{
        try{
            const fileName = uuid.v4() + '.jpg';

            const uploadResult = await this.s3.upload({
                Bucket: this.bucketName,
                Key: fileName,
                Body: file.buffer,
                ACL: 'public-read'
            }).promise();

            return fileName;
        }
        catch(e){
            throw new HttpException('Відбулася помилка при запису файлу', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getFileURLByKey(image: string){
        const params = {
            Bucket: this.bucketName,
            Key: image,
            Expires: 31536000 
        };
        return "https://"+this.bucketName+".s3."+this.region+".amazonaws.com/"+image;
    }


    
    async getFile(image: string) {
        try {
            const result = await this.s3
            .getObject({ Bucket: this.bucketName, Key: image }).promise();
            return result.Body;
          } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
