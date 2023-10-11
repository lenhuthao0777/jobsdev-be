import { HttpStatus, Injectable } from '@nestjs/common'
import { UploadFile } from 'src/lib/Utils'
import { TResponse } from 'src/types/globals.type'

@Injectable()
export class FileService {
  async create(file: File) {
    try {
      const data: any = await UploadFile(file)

      return {
        status: HttpStatus.CREATED,
        data: data,
        message: 'Upload file success!',
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }
}
