import { Module } from '@nestjs/common';
import { JournalistController } from './journalist.controller';
import { JournalistService } from '@/modules/journalist/journalist.service';

@Module({
  providers: [JournalistService],
  controllers: [JournalistController],
})
export class JournalistModule {}
