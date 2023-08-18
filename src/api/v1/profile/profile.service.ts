import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { TResponse } from 'src/types/globals.type';
import { PrismaService } from 'src/lib/Prisma.service';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(readonly prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto): Promise<TResponse<any>> {
    try {
      const res: Profile = await this.prisma.profile.create({
        data: {
          firstName: createProfileDto.firstName,
          lastName: createProfileDto.lastName,
          headLine: createProfileDto.headLine,
          education: createProfileDto.education,
          industry: createProfileDto.industry,
          region: createProfileDto.region,
          city: createProfileDto.city,
          summary: createProfileDto.summary,
          avatar: createProfileDto.avatar,
          backgroundImage: createProfileDto.backgroundImage,
          contact: createProfileDto.contact,
          content: createProfileDto.content,
          userId: createProfileDto.userId,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: res,
        message: 'Create profile success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.prisma.profile.findFirst({
        where: {
          userId: id,
        },
      });

      return {
        status: HttpStatus.OK,
        data: res,
        message: 'Get profile success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    try {
      const res = await this.prisma.profile.update({
        where: {
          id,
          userId: updateProfileDto.userId,
        },
        data: {
          firstName: updateProfileDto.firstName,
          lastName: updateProfileDto.lastName,
          headLine: updateProfileDto.headLine,
          education: updateProfileDto.education,
          industry: updateProfileDto.industry,
          region: updateProfileDto.region,
          city: updateProfileDto.city,
          summary: updateProfileDto.summary,
          avatar: updateProfileDto.avatar,
          backgroundImage: updateProfileDto.backgroundImage,
          contact: updateProfileDto.contact,
          content: updateProfileDto.content,
        },
      });
      return {
        status: HttpStatus.OK,
        data: res,
        message: 'Update profile success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
