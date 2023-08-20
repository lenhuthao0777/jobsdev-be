import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

//
import { CreateAuthDto } from './dto/create-auth.dto';
import { TResponse } from 'src/types/globals.type';
import { compare, hash } from 'bcrypt';
import { saltOrRounds } from 'src/constants';
import { PrismaService } from 'src/lib/Prisma';

@Injectable()
export class AuthService {
  constructor(readonly prisma: PrismaService, private jwt: JwtService) {}
  async create(createAuthDto: CreateAuthDto): Promise<TResponse<any>> {
    try {
      const user = await this.validateUser(createAuthDto.email);

      if (user) {
        return {
          status: HttpStatus.CONFLICT,
          data: user,
          message: 'Account already exists!',
        };
      }

      const hashPass = await hash(createAuthDto.password, saltOrRounds);

      const res: User = await this.prisma.user.create({
        data: {
          firstName: createAuthDto.firstName,
          lastName: createAuthDto.lastName,
          email: createAuthDto.email,
          password: hashPass,
          roleId: createAuthDto.roleId,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: {
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
        },
        message: 'Register account success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async login(params: any): Promise<TResponse<any>> {
    try {
      const user: any = await this.validateUser(params.email);

      if (!user) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Email or Password is incorrect!',
        };
      }

      const comparePass = await compare(params.password, user.password);

      if (comparePass) {
        const token = await this.createToken(params);

        await this.prisma.user.update({
          where: {
            email: params.email,
          },
          data: {
            accessToken: token,
          },
        });
        return {
          status: HttpStatus.OK,
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user?.role,
            accessToken: token,
          },
          message: 'Login success!',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async findOne(email: string): Promise<TResponse<Omit<User, 'password'>>> {
    try {
      const res = await this.prisma.user.findFirst({
        where: {
          email,
        },
        include: {
          role: true,
          profile: true,
          CompanyProfile: true,
        },
      });

      const { password, ...data } = res;

      return {
        status: HttpStatus.OK,
        data: data,
        message: 'Get user success!',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async validateUser(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
        include: {
          role: true,
        },
      });

      if (user) {
        return user;
      }

      return null;
    } catch (error) {
      return error;
    }
  }

  async createToken(params: any) {
    if (!params) return null;
    const token = await this.jwt.signAsync(params);
    return token;
  }
}
