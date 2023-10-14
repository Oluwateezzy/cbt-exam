import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { PrimaService } from 'src/prima/prima.service';

@Module({
  controllers: [OptionController],
  providers: [OptionService, PrimaService]
})
export class OptionModule {}
