import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService} from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userdto } from './dto/user.dto';
import { RegisterUserDto } from 'src/users/user.dto';
import { Roles } from './roles/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from './jwt.guard';
import { RoleGuard } from './role/role.guard';


@ApiTags("auth")
@Controller('auth')
@ApiBearerAuth('JWT')
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

    @Post('/registerCourses')
    @Roles(Role.ADMIN, Role.STUDENT)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async registerCourses(@Body() data: [], @Req() req) {
        return this.authService.registerCourses(data, req.user.id)
    }
}
