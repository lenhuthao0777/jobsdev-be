import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { TResponse } from 'src/types/globals.type';
import { PrismaService } from 'src/lib/Prisma';
import { CompanyProfile } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(readonly prisma: PrismaService) {}
  async create(createCompanyDto: CreateCompanyDto): Promise<TResponse<any>> {
    try {
      const res = await this.prisma.companyProfile.create({
        data: {
          firstName: createCompanyDto.firstName,
          lastName: createCompanyDto.lastName,
          headLine: createCompanyDto.headLine,
          region: createCompanyDto.region,
          city: createCompanyDto.city,
          summary: createCompanyDto.summary,
          industry: createCompanyDto.industry,
          companySize: createCompanyDto.companySize,
          content: createCompanyDto.content,
          contact: createCompanyDto.contact,
          avatar: createCompanyDto.avatar,
          backgroundImage: createCompanyDto.backgroundImage,
          userId: createCompanyDto.userId,
        },
      });
      return {
        status: HttpStatus.CREATED,
        data: res,
        message: 'Create company success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async findAll(): Promise<TResponse<Array<CompanyProfile>>> {
    try {
      const res = await this.prisma.companyProfile.findMany();

      return {
        status: HttpStatus.OK,
        data: res,
        message: 'Get companies success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async findOne(id: string): Promise<TResponse<CompanyProfile>> {
    try {
      const res = await this.prisma.companyProfile.findFirst({
        where: {
          userId: id,
        },
      });
      return {
        status: HttpStatus.OK,
        data: res,
        message: 'Get company success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<TResponse<any>> {
    try {
      const res = await this.prisma.companyProfile.update({
        where: {
          id,
          userId: updateCompanyDto.userId,
        },
        data: {
          firstName: updateCompanyDto.firstName,
          lastName: updateCompanyDto.lastName,
          headLine: updateCompanyDto.headLine,
          region: updateCompanyDto.region,
          city: updateCompanyDto.city,
          summary: updateCompanyDto.summary,
          industry: updateCompanyDto.industry,
          companySize: updateCompanyDto.companySize,
          content: updateCompanyDto.content,
          contact: updateCompanyDto.contact,
          avatar: updateCompanyDto.avatar,
          backgroundImage: updateCompanyDto.backgroundImage,
        },
      });
      return {
        status: HttpStatus.OK,
        data: res,
        message: 'Update company success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}
