import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryProvider } from 'src/lib/Cloudinary.service';
import { PrismaService } from 'src/lib/Prisma.service';

@Module({
  controllers: [FileController],
  providers: [FileService, PrismaService, CloudinaryProvider],
})
export class FileModule {}
