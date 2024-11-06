import { Body, Controller, Post } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { TwilioMessageBody } from '../common/interfaces/twilio-message-body/twilio-message-body.interface';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('webhook')
  async receiveMessage(@Body() body: TwilioMessageBody) {
    const { From, Body } = body;
    const responseMessage = this.handleIncomingMessage(Body);
    try {
      await this.whatsappService.sendMessage(From, responseMessage);
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  private handleIncomingMessage(message: string) {
    if (message.toLowerCase().includes('menu')) {
      return 'Aqui está o nosso menu...';
    }
    return 'Olá! Como posso ajudar você hoje?';
  }
}
