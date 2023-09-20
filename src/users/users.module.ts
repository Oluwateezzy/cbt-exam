import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrimaService } from 'src/prima/prima.service';

@Module({
  providers: [UsersService, PrimaService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
