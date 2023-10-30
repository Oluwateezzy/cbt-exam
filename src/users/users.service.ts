import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrimaService } from 'src/prima/prima.service';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrimaService){}

  async create(data) {
    try {
      const user = await this.prisma.user.create({ data })
      user.password = 'null'
      return {
        status: HttpStatus.CREATED,
        data: user
      }
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
    }
  }
  
  async getAll(){
    try {
      return await this.prisma.user.findMany({
        include: {
          examName: true,
          courses: true,
          Response: true
        }
      })
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
    }
  }
  
  async getOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          Response: true
        }
      })
      if (!user) {
        throw new HttpException("user not found", HttpStatus.NOT_FOUND)
      }
      user.password = 'null'
      return {
        status: HttpStatus.OK,
        data: user
      }
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async score(id){
    try {
      let mark = 0
      const user = await this.prisma.user.findUnique({
        where: {
          id
        },
        include: {
          Response: true
        }
      })
      const responses = user.Response
      for (let response of responses){
        const question = await this.prisma.question.findUnique({
          where: {
            id: response.questionId
          }
        })
        if (question.correctAnswer === response.answer){
          mark = mark + 10
        }
      }
      user.password = 'null'
      return {
        status: HttpStatus.OK,
        data: {...user, score: mark}
      }
    } catch (err) {
      
    }
  }

  async update(id: string, data: UpdateUserDto){
    try {
      const { examName, ...userData } = data
      const user = await this.prisma.user.findUnique({
        where: {
          id
        }
      })
      if (!user) {
        throw new HttpException("user not found", HttpStatus.NOT_FOUND)
      }
      const result = await this.prisma.user.update({
        where: {
          id,
        },
        data: { ...userData,
        examName: {
          connect: {name: examName}
        } },
      })
      return result
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async delete(id: string){
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        }
      })
      if (!user) {
        throw new HttpException("user not found", HttpStatus.NOT_FOUND)
      }
      await this.prisma.user.delete({
        where: {
          id
        }
      })
      return {
        success: true
      }
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
