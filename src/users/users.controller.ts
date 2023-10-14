import { Controller, Get, Param, Request, Post, Body, UseGuards, Put, Delete, HttpStatus, HttpCode} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from "src/auth/roles/roles.decorator"
import { CreateUserDto, UpdateUserDto } from './user.dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('JWT')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Get("")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'Get all users'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RoleGuard)
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
