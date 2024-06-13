import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';

import { GetUrl } from './get-urls-utils.service';
import { LatLongDto } from './dto/lat-long.dto';

@Injectable()
export class GetAddressService {
  constructor(private readonly httpService: HttpService, private readonly getUrl: GetUrl) {}

  async getCountryAndState(latLongDto: LatLongDto) {
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
