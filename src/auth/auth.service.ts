import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client'
import { PrimaService } from 'src/prima/prima.service';
import { userdto } from './dto/user.dto';
import { RegisterUserDto } from 'src/users/user.dto';
import { CreateCourseDto } from 'src/course/course.dto';


@Injectable()
export class AuthService {
  constructor(private prisma: PrimaService){}
  async validate(data: userdto){
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email
        }
      })
      if (user && data.password == user.password) {
        const token = sign({ ...user }, 'secrete')
        return { token, user }
      }
      throw new UnauthorizedException()
    
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async register(data: RegisterUserDto) {
    try {
      const {email, username, password, role, examName, courses} = data

      const exam = await this.prisma.exam.findUnique({
        where: {
          name: examName
        }
      })
      if (!exam) {
        throw new HttpException("ExamName not found", HttpStatus.AMBIGUOUS)
      }
      const user = await this.prisma.user.create({
        data: {
          email,
          username,
          password,
          role,
          examName,
        }
      })
      return {
        status: HttpStatus.CREATED,
        data: user
      }
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
