import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { sign } from 'jsonwebtoken';

export class userdto {
    @ApiProperty()
    username: string

    @ApiProperty()
    password: string
}

@Injectable()
export class AuthService {
    private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      role: "admin",
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      role: "user"
    },
  ];
  async validate(data: userdto){
    const user = this.users.find((user) => user.username == data.username)
    if (user && data.password == user.password){
      const token = sign({...user}, 'secrete')
      return {token, user}
    }
    throw new UnauthorizedException()
  }
}
