import { Module } from '@nestjs/common';
import { PrimaService } from './prima.service';

@Module({
  providers: [PrimaService]
})
export class PrimaModule {}
