import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { GetUrl } from '../../common/utils';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Injectable()
export class PaymentGatewayService {
  private readonly logger: Logger = new Logger(PaymentGatewayService.name);
  constructor(private readonly httpService: HttpService, private readonly getUrl: GetUrl) {}

  async createPaymentLink(createPaymentLinkDto: CreatePaymentLinkDto) {
    try {
      this.logger.log('createPaymentLinkDto', createPaymentLinkDto);
      const responseData: any = await this.httpService.axiosRef.post(this.getUrl.getPaymentLink, createPaymentLinkDto);
      this.logger.log('responseData', responseData?.data);
      return responseData?.data;
    } catch (error) {
      this.logger.error('createPaymentLink Error: ', error);
    }
  }

  async verifyPayment(verifyPaymentDto: VerifyPaymentDto) {
    try {
      this.logger.log('verifyPaymentDto', verifyPaymentDto);
      const responseData: any = await this.httpService.axiosRef.post(this.getUrl.verifyPaymentUrl, verifyPaymentDto);
      this.logger.log('responseData', responseData?.data);
      return responseData?.data;
    } catch (error) {
      this.logger.error('createPaymentLink Error: ', error);
    }
  }
}
