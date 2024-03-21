import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateEAuthDto } from './dto/create-e-auth.dto';
import { GetAuthUrls } from '../common/utils/get-urls-utils.service';
import { IProvider } from './interfaces/provider.interface';
import { ResponseUtilsService } from '../common/utils/response-utils.service';
import { ITokenAndUserDetails } from './interfaces';
import { CustomMessage } from '../common/enums/message';

@Injectable()
export class EAuthService {
  private readonly logger: Logger;
  constructor(
    private readonly httpService: HttpService,
    private readonly getAuthUrl: GetAuthUrls,
    private responseUtilsService: ResponseUtilsService,
  ) {
    this.logger = new Logger(EAuthService.name);
  }
  async getUser(createEAuthDto: CreateEAuthDto) {
    try {
      const userDetails: ITokenAndUserDetails = (
        await this.httpService.axiosRef.get(this.getAuthUrl.getUserInfoUrl(createEAuthDto.provider), {
          params: { code: createEAuthDto.code },
        })
      ).data;
      return this.responseUtilsService.getSuccessResponse(userDetails, CustomMessage.OK);
    } catch (error) {
      this.logger.error('Failed to fetch userDetails', error);
      throw error;
    }
  }

  async getProviders() {
    try {
      const responseData: IProvider[] = (await this.httpService.axiosRef.get(this.getAuthUrl.getProvidersUrl)).data;
      const providerData = this.responseUtilsService.getSuccessResponse(responseData, CustomMessage.OK);
      // console.log('providerData', providerData);
      return providerData;
    } catch (error) {
      this.logger.error('Failed to fetch providers', error);
      throw error;
    }
  }

  async getAccessToken(provider: string) {
    try {
      const accessToken: string = (await this.httpService.axiosRef.get(this.getAuthUrl.getUserAccessTokenUrl(provider)))
        .data;
      return this.responseUtilsService.getSuccessResponse(accessToken, CustomMessage.OK);
    } catch (error) {
      this.logger.error('Failed to fetch accessToken', error);
      throw error;
    }
  }
}
