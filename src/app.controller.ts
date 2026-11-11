import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { EditProfileDto } from './editprofile.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getFooldal() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Post('/')
  @Render('index')
  editProfile(@Body() body: EditProfileDto) {
    const userRegex = /^[a-z][a-z\d]*$/;
    if (!userRegex.test(body.username)) {
      return {
        error: "Invalid username"
      }
    }
  }
}
