import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrimaService } from 'src/prima/prima.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrimaService]
})
export class CourseModule {}
