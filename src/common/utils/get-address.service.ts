import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

import { GetUrl } from './get-urls-utils.service';
import { LatLongDto } from './dto/lat-long.dto';
import { PrimaryCountryStateDataAPI } from '../strategies/get-address-with-latlong.strategy';
import { SecondaryCountryStateDataAPI } from '../strategies/fallback-api.strategy';
import { ADDRESS_SERVICE_ERROR } from '../constants/error-message';

@Injectable()
export class GetAddressService {
  private readonly logger: Logger = new Logger(GetAddressService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly getUrl: GetUrl,
    private readonly primaryCountryStateDataAPI: PrimaryCountryStateDataAPI,
    private readonly secondaryCountryStateDataAPI: SecondaryCountryStateDataAPI,
  ) {}

  async getCountryAndState(latLongDto: LatLongDto) {
    try {
      const primaryData = await this.primaryCountryStateDataAPI.getData(latLongDto);
      return primaryData;
    } catch (error) {
      try {
        const secondaryData = await this.secondaryCountryStateDataAPI.getData(latLongDto);
        return secondaryData;
      } catch (fallbackError) {
        this.logger.error(ADDRESS_SERVICE_ERROR.GET_COUNTRY_STATE_ERROR, fallbackError);
        throw new Error(ADDRESS_SERVICE_ERROR.GET_COUNTRY_STATE_ERROR);
      }
    }
  }
}
