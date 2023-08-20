import { Controller, Get } from '@nestjs/common';
import { SkillService } from './skill.service';

@Controller('api/v1/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  findAll() {
    return this.skillService.findAll();
  }
}
