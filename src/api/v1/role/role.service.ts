import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/Prisma';
import { TResponse } from 'src/types/globals.type';

@Injectable()
export class RoleService {
  constructor(readonly prisma: PrismaService) {}

  async findAll(): Promise<TResponse<any>> {
    try {
      const res: any = await this.prisma.role.findMany();

      return {
        status: HttpStatus.OK,
        data: res,
        message: 'Get role success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}
