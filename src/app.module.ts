import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Module
import { PrismaService } from './lib/Prisma.service';
import { AuthModule } from './api/v1/auth/auth.module';
import { ProfileModule } from './api/v1/profile/profile.module';
import { RoleModule } from './api/v1/role/role.module';
import { SkillModule } from './api/v1/skill/skill.module';
import { FileModule } from './api/v1/file/file.module';
import { CompanyModule } from './api/v1/company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ProfileModule,
    RoleModule,
    SkillModule,
    FileModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
