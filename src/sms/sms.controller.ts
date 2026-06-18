import { Body, Controller, Post } from '@nestjs/common';
import { TermiiService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly termiiService: TermiiService) {}
  @Post('/send')
  async sendMessage(@Body() body: { to: string; message: string }) {
    return await this.termiiService.sendSms(body.to, body.message);
  }
}
