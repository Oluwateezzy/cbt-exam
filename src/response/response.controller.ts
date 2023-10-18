import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto, UpdateResponseDto } from './response.dto';

@Controller('response')
export class ResponseController {
    constructor(private responseService: ResponseService){}
    @Post('')
    async create(@Body() data: CreateResponseDto){
        return this.responseService.create(data)
    }
    @Post('/createMany')
    async createMany(@Body() data: CreateResponseDto[]) {
        return this.responseService.createMany(data)
    }
    @Get('')
    async findAll() {
        return this.responseService.findAll()
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.responseService.findOne(id)
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateResponseDto) {
        return this.responseService.update(id, data)
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.responseService.delete(id)
    }
}
