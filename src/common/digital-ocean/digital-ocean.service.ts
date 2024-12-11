import { S3 } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggersService } from '../log/log.service';

@Injectable()
export class DigitalOceanService {
  private readonly s3: S3;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggersService: LoggersService,
  ) {
    // Initialize S3 client in constructor
    this.s3 = new S3({
      region: this.configService.get<string>('DO_REGION'),
      forcePathStyle: false,
      credentials: {
        accessKeyId: this.configService.get<string>('DO_ACCESSKEY'),
        secretAccessKey: this.configService.get<string>('DO_SECRETKEY'),
      },
      endpoint: this.configService.get<string>('DO_ENDPOINT'),
    });
  }

  // async uploadFile(file: Express.Multer.File, folder: string) {
  //   try {
  //     // Generate a unique filename using original name and timestamp
  //     const timestamp = Date.now();
  //     const originalName = file.originalname.replace(/\s+/g, '-').toLowerCase();
  //     const key = `${folder}/${timestamp}-${originalName}`;

  //     const params = {
  //       Bucket: this.configService.get<string>('DO_BUCKET'),
  //       Key: key,
  //       Body: file.buffer,
  //       ContentType: file.mimetype,
  //       ACL: 'public-read',
  //     };

  //     const data = await this.s3.putObject(params);

  //     // Return both the upload result and the file URL
  //     return {
  //       ...data,
  //       url: `${this.configService.get<string>('DO_ENDPOINT')}/${this.configService.get<string>('DO_BUCKET')}/${key}`,
  //     };
  //   } catch (error) {
  //     this.loggersService.error(
  //       `DigitalOceanService.uploadFile: ${error.message}`,
  //       error.stack,
  //       'DigitalOceanService.uploadFile',
  //     );
  //     throw new Error(`Failed to upload file: ${error.message}`);
  //   }
  // }

  // Add method to delete file from digital ocean
  async deleteFile(key: string) {
    try {
      const params = {
        Bucket: this.configService.get<string>('DO_BUCKET'),
        Key: key,
      };

      const data = await this.s3.deleteObject(params);
      return data;
    } catch (error) {
      this.loggersService.error(
        `DigitalOceanService.deleteFile: ${error.message}`,
        error.stack,
        'DigitalOceanService.deleteFile',
      );
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
}
