import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';

@ApiTags('Question Module')
@Controller('question')
@ApiBearerAuth('JWT')
export class QuestionController {
    constructor(private questionService: QuestionService){}
    @Post('')
    async create(@Body() data: CreateQuestionDto) {
        return this.questionService.create(data)
    }
    @Get('')
    async findAll() {
        return this.questionService.findAll()
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.questionService.findOne(id)
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateQuestionDto) {
        return this.questionService.update(id, data)
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.questionService.delete(id)
    }
}
