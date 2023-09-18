import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService],
  imports: [UsersModule],
  controllers: [AuthController]
})
export class AuthModule {}
