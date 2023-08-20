import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { PrismaService } from 'src/lib/Prisma';

@Module({
  controllers: [SkillController],
  providers: [SkillService, PrismaService],
})
export class SkillModule {}
