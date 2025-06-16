import { Body, Controller, Injectable, Logger, Post } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { Public } from '../../common/decorators/public.decorators';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Controller('payment')
@Injectable()
export class PaymentGatewayController {
  private readonly logger: Logger = new Logger(PaymentGatewayController.name);

  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  @Public()
  @Post('/create-link')
  async createPaymentLink(@Body() createPaymentLink: CreatePaymentLinkDto) {
    this.logger.log('createPaymentLinkDto', createPaymentLink);

    return await this.paymentGatewayService.createPaymentLink(createPaymentLink);
  }

  @Public()
  @Post('/verify')
  async verifyPayment(@Body() verifyPaymentDto: VerifyPaymentDto) {
    this.logger.log('verifyPaymentDto', verifyPaymentDto);

    return await this.paymentGatewayService.verifyPayment(verifyPaymentDto);
  }
}
