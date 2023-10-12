import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrimaService } from 'src/prima/prima.service';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrimaService){}

  async create(data) {
    try {
      const user = await this.prisma.user.create({ data })
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
      return await this.prisma.user.findMany({})
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
    }
  }
  
  async getOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id }
      })
      if (!user) {
        throw new HttpException("user not found", HttpStatus.NOT_FOUND)
      }
      return {
        status: HttpStatus.OK,
        data: user
      }
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, data: UpdateUserDto){
    try {
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
        data: { ...data },
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
