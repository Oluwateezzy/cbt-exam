import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userdto } from 'src/users/users.controller';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post("")
    async login(@Body() data: userdto){
        return this.authService.login(data)
    }
}
