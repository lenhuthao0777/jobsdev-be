import { HttpStatus, Injectable } from '@nestjs/common';
import { TResponse } from 'src/types/globals.type';
import { PrismaService } from 'src/lib/Prisma';

@Injectable()
export class SkillService {
  constructor(readonly prisma: PrismaService) {}

  async findAll(): Promise<TResponse<Array<any>>> {
    try {
      const res = await this.prisma.skill.findMany();
      return {
        status: HttpStatus.OK,
        data: res,
        message: 'Get skills success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}
