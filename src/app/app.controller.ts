// import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post("auth/login")
  //   @UseGuards(AuthGuard('local'))
  //   async login(@Request() req){
  //       return req
  //   }
}
