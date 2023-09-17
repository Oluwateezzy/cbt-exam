import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  
  async getAll(){
    return await this.users
  }
  
  async getOne(id: number){
    const getuser = await this.users.find((user) => {
        return user.userId == id
    })
    if (!getuser){
        throw new HttpException("user not found", HttpStatus.NOT_FOUND)
    }else{
        return {
            status: HttpStatus.OK,
            data: getuser
        }
    }
  }

  async create(data){
    const user = this.users.push(data)
    return {
        status: HttpStatus.OK
    }
  }
}
