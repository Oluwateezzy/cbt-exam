import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrimaService } from 'src/prima/prima.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthService, PrimaService, JwtStrategy, JwtService],
  imports: [UsersModule],
  controllers: [AuthController],
  exports: []
})
export class AuthModule {}
