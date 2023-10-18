import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { PrimaService } from 'src/prima/prima.service';

@Module({
  providers: [ResponseService, PrimaService],
  controllers: [ResponseController]
})
export class ResponseModule {}
