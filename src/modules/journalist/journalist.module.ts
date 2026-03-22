import { Module } from '@nestjs/common';
import { JournalistService } from './journalist.service';
import { JournalistController } from './journalist.controller';

@Module({
  providers: [JournalistService],
  controllers: [JournalistController]
})
export class JournalistModule {}
