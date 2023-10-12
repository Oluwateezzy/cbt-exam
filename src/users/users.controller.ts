import { Controller, Get, Param, Request, Post, Body, UseGuards, Put, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from "src/auth/roles/roles.decorator"
import { CreateUserDto, UpdateUserDto } from './user.dto';

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
    async getOne(@Param('id') id: string){
        return this.usersService.getOne(id)
    }

    @Post("")
    @ApiBody({type: CreateUserDto})
    async create(@Body() data: CreateUserDto){
        return this.usersService.create(data)
    }

    @Put(":id")
    @ApiBody({type: UpdateUserDto})
    async update(@Param('id') id: string, @Body() data: UpdateUserDto){
        return this.usersService.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.usersService.delete(id)
    }
}
