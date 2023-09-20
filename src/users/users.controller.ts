import { Controller, Get, Param, Request, Post, Body, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from "src/auth/roles/roles.decorator"

export class userdto {
    @ApiProperty()
    username: string

    @ApiProperty()
    password: string
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get("")
    async name() {
        return this.usersService.getAll()
    }

    @Get(":id")
    async getOne(@Param('id') id: number){
        return this.usersService.getOne(Number(id))
    }

    @Post("")
    @ApiBody({type: userdto})
    async create(@Body() data: userdto){
        this.usersService.create(data)
    }
}
