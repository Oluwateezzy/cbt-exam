import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OptionService } from './option.service';
import { CreateOptionDto, UpdateOptionDto } from './option.dto';

@ApiTags('Question Module')
@Controller('option')
@ApiBearerAuth('JWT')
export class OptionController {
    constructor(private optionService: OptionService) {}
    @Post('')
    async create(@Body() data: CreateOptionDto) {
        return this.optionService.create(data)
    }
    @Get('')
    async findAll() {
        return this.optionService.findAll()
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.optionService.findOne(id)
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateOptionDto){
        return this.optionService.update(id, data)
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.optionService.delete(id)
    }
}
