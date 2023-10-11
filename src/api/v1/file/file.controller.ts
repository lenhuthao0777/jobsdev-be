import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileService } from './file.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('api/v1/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: any) {
    return this.fileService.create(file);
  }
}
