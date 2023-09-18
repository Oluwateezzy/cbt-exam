import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService, userdto } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('')
    login(@Body() data: userdto){
        return this.authService.validate(data)
    }

}
