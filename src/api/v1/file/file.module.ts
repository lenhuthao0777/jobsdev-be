import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryProvider } from 'src/lib/Cloudinary';
import { PrismaService } from 'src/lib/Prisma';

@Module({
  controllers: [FileController],
  providers: [FileService, PrismaService, CloudinaryProvider],
})
export class FileModule {}
