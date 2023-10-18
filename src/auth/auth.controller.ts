import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService} from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { userdto } from './dto/user.dto';
import { RegisterUserDto } from 'src/users/user.dto';


@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/login')
    async login(@Body() data: userdto){
        return this.authService.validate(data)
    }

    @Post('/register')
    async register(@Body() data: RegisterUserDto) {
        return this.authService.register(data)
    }
}
