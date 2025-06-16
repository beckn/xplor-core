// src/common/strategies/get-address-with-latlong.strategy.ts

import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';

import { GetUrl } from '../utils';
import { LatLongDto } from '../utils/dto/lat-long.dto';
import { IPrimaryCountryStateDataAPI } from '../interfaces/api-call-strategy.interface';

@Injectable()
export class PrimaryCountryStateDataAPI implements IPrimaryCountryStateDataAPI {
  constructor(private readonly httpService: HttpService, private readonly getUrl: GetUrl) {}
  async getData(latLongDto: LatLongDto) {
    const response = (
      await this.httpService.axiosRef.get(`${this.getUrl.getAddressWithLatLongUrl}?format=json`, {
        params: {
          lat: latLongDto.lat,
          lon: latLongDto.long,
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
