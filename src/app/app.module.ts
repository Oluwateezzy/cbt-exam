import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CourseModule } from 'src/course/course.module';
import { ExamModule } from 'src/exam/exam.module';
import { OptionModule } from 'src/option/option.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PassportModule,
    JwtModule.register({secret: 'secrete', signOptions: {expiresIn: '1h'}}),
    CourseModule,
    ExamModule,
    OptionModule,
    QuestionModule
  ],
  controllers: [AppController,],
  providers: [AppService, JwtStrategy]
})
export class AppModule {}
