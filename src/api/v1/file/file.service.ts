import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/Prisma';
import { UploadFile } from 'src/lib/Utils';
import { TResponse } from 'src/types/globals.type';

@Injectable()
export class FileService {
  constructor(readonly prisma: PrismaService) {}
  async create(file: File): Promise<TResponse<any>> {
    try {
      const data: any = await UploadFile(file);

      const res: any = await this.prisma.file.create({
        data: {
          info: data,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: res,
        message: 'Upload file success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}
