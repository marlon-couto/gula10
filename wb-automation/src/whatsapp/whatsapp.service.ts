import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WhatsappService {
  private client: Twilio;
  private readonly phoneNumber: string;

  constructor(private configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    this.client = new Twilio(accountSid, authToken);
    this.phoneNumber = this.configService.get<string>('TWILIO_PHONE_NUMBER');
  }

  async sendMessage(to: string, message: string) {
    const from = `whatsapp:${this.phoneNumber}`;
    return this.client.messages.create({
      from,
      body: message,
      to: `whatsapp:${to}`,
    });
  }
}
