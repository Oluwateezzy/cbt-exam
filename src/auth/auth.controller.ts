import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService} from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/user.dto';


@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('')
    login(@Body() data: CreateUserDto){
        return this.authService.validate(data)
    }

}
