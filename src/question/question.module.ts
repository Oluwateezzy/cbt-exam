import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrimaService } from 'src/prima/prima.service';

@Module({
  providers: [QuestionService, PrimaService],
  controllers: [QuestionController]
})
export class QuestionModule {}
