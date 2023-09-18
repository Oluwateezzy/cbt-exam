import { Controller, Get, Param, Post, Body} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';


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
    @Get("")
    async name() {
        return this.usersService.getAll()
    }

    @Get(":id")
    async getOne(@Param('id') id: number){
        return this.usersService.getOne(id)
    }

    @Post("")
    @ApiBody({type: userdto})
    async create(@Body() data: userdto){
        this.usersService.create(data)
    }
}
