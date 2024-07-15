import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';

import { GetUrl } from '../utils';
import { LatLongDto } from '../utils/dto/lat-long.dto';
import { ISecondaryCountryStateDataAPI } from '../interfaces/api-call-strategy.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecondaryCountryStateDataAPI implements ISecondaryCountryStateDataAPI {
  constructor(
    private readonly httpService: HttpService,
    private readonly getUrl: GetUrl,
    private readonly configService: ConfigService,
  ) {}
  async getData(latLongDto: LatLongDto) {
    const apiKey = this.configService.get('geoCodeServiceApiKey');
    // Implementation for secondary API
    const response = (
      await this.httpService.axiosRef.get(this.getUrl.getGeoCodeServiceUrl, {
        params: {
          lat: latLongDto.lat,
          lon: latLongDto.long,
          api_key: apiKey,
        },
      })
    )?.data;
    if (response.error) throw new NotFoundException(response.error);
    return {
      state: response?.address?.state,
      country: response?.address?.country,
    };
  }
}
