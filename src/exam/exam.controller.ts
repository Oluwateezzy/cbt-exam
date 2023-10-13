import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateExamDto, UpdateExamDto } from './exam.dto';

@ApiTags('Exam Module')
@Controller('exam')
export class ExamController {
    constructor(private examService: ExamService){}
    @Post('')
    async create(@Body() data: CreateExamDto){
        return this.examService.create(data)
    }
    @Get('')
    async findAll(){
        return this.findAll()
    }
    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.examService.findOne(id)
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateExamDto){
        return this.examService.update(id, data)
    }
    @Delete(':id')
    async delete(@Param('id') id: string){
        return this.examService.delete(id)
    }
}
