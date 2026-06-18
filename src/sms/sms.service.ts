import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TermiiService {
  constructor(private readonly http: HttpService) {}

  private apiKey = process.env.TERMII_API_KEY;
  private senderId = process.env.TERMII_SENDER_ID;
  private baseUrl = process.env.TERMII_BASE_URL;

  async sendSms(to: string, message: string): Promise<Record<string, any>> {
    const url = `${this.baseUrl}sms/send`;

    const payload = {
      to,
      from: this.senderId,
      sms: message,
      type: 'plain',
      channel: 'generic',
      api_key: this.apiKey,
    };

    const response = await firstValueFrom(this.http.post(url, payload));

    return response.data as Record<string, any>;
  }
}
