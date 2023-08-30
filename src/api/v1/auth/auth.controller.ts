import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { BASE_URL_API } from 'src/constants'

@Controller(`${BASE_URL_API}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto)
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body)
  }

  @Get('me/:param')
  findOne(@Param('param') param: any) {
    return this.authService.findOne(param)
  }
}
