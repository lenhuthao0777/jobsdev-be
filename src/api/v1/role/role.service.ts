import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/lib/Prisma.service';
import { TResponse } from 'src/types/globals.type';
import { Role } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(readonly prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll(): Promise<TResponse<Role>> {
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
