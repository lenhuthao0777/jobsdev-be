import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { CloudinaryProvider } from 'src/lib/Cloudinary'

@Module({
  controllers: [FileController],
  providers: [FileService, CloudinaryProvider],
})
export class FileModule {}
