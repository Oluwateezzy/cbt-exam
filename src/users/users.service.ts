import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrimaService } from 'src/prima/prima.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrimaService){}
  
  async getAll(){
    return await this.prisma.user.findMany({})
  }
  
  async getOne(id: number){
    const user = await this.prisma.user.findUnique({
      where: {id}
    })
    if (!user){
        throw new HttpException("user not found", HttpStatus.NOT_FOUND)
    }
    return {
      status: HttpStatus.OK,
      data: user
    }
  }

  async create(data){
    const user = await this.prisma.user.create({data})
    return {
        status: HttpStatus.CREATED,
        data: user
    }
  }
}
