import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { S3 } from 'aws-sdk';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { File } from './file.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([User,File]),
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
  ],
  providers: [FilesService,
    {
      provide: S3,
      useValue: new S3({ 
        accessKeyId: process.env.ACCESS_KEY_ID, 
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: process.env.REGION
      })
    }
  ],
  exports: [FilesService]
})
export class FilesModule {}
