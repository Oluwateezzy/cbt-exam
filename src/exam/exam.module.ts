import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { PrimaService } from 'src/prima/prima.service';

@Module({
  providers: [ExamService, PrimaService],
  controllers: [ExamController]
})
export class ExamModule {}
