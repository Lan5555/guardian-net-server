import { Module } from '@nestjs/common';
import { TermiiService } from './sms.service';
import { SmsController } from './sms.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SmsController],
  providers: [TermiiService],
})
export class SmsModule {}
