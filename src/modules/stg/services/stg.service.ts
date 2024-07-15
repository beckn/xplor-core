/* eslint-disable no-console */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GetUrl } from '../../../common/utils';
import { TranslateService } from '../../../common/utils/translate/translate.service';
import { GetDeviceService } from '../../../common/utils/getDevice/get-device';
import { SearchRequestDto } from '../dto/search-request.dto';
import { InitRequestDto } from '../dto/init-request.dto';
import { ConfirmRequestDto } from '../dto/confirm-request.dto';
import { AxiosService } from '../../../common/axios/axios.service';
import { StatusRequestDto } from '../dto/status-request.dto';
import { SelectRequestDto } from '../dto/select-request-dto';
import { RateRequestDto } from '../dto/rate-request.dto';
import { CancelRequestDto } from '../dto/cancel-request.dto';
import { UpdateRequestDto } from '../dto/update-request.dto';
import { SupportRequestDto } from '../dto/support-request.dto';
import { TrackRequestDto } from '../dto/track-request.dto';

@Injectable()
export class StgService {
  private readonly logger: Logger = new Logger(StgService.name);
  private deviceIdMapper: Map<string, any> = new Map();
  private serverDefaultLanguage: string;
  constructor(
    private readonly httpService: AxiosService,
    private readonly getUrl: GetUrl,
    private readonly translation: TranslateService,
    private readonly configService: ConfigService,
    private readonly getDeviceService: GetDeviceService,
  ) {
    this.deviceIdMapper = new Map();
    this.serverDefaultLanguage = this.configService.get('serverDefaultLanguage');
  }

  async search(searchRequestDto: SearchRequestDto) {
    try {
      this.logger.log('stg search URL: ', this.getUrl.getStgSearchUrl);
      const searchResponse = await this.httpService.post(this.getUrl.getStgSearchUrl, searchRequestDto);
      return searchResponse;
    } catch (error) {
      this.logger.log('error?.response?.data?.error?.message', error?.response?.data?.error?.message);
      if (error?.response?.data?.error?.message == '' || error?.response?.data?.error?.message == undefined) {
        return true;
      }

      throw error?.response?.data;
    }
  }

  async select(selectRequestDto: SelectRequestDto) {
    try {
      const selectResponse = await this.httpService.post(this.getUrl.getGclSelectUrl, selectRequestDto);
      this.logger.log('selectResponse', selectResponse);
      return selectResponse;
    } catch (error) {
      this.logger.log('error?.response?.data?.error?.message', error?.response?.data?.error?.message);
      if (error?.response?.data?.error?.message == '' || error?.response?.data?.error?.message == undefined) {
        return true;
      }

      return error;
    }
  }

  async init(initRequestDto: InitRequestDto) {
    try {
      this.logger.log('initRequestDto', initRequestDto);
      const initResponse = (await this.httpService.post(this.getUrl.getGclInitUrl, initRequestDto))?.data;
      return initResponse;
    } catch (error) {
      this.logger.log('error?.response?.data?.error?.message', error?.response?.data?.error?.message);
      if (error?.response?.data?.error?.message == '' || error?.response?.data?.error?.message == undefined) {
        return true;
      }

      return error;
    }
  }

  async confirm(confirmRequestDto: ConfirmRequestDto) {
    try {
      const initResponse = (await this.httpService.post(this.getUrl.getGclConfirmUrl, confirmRequestDto))?.data;
      return initResponse;
    } catch (error) {
      this.logger.log('error?.response?.data?.error?.message', error?.response?.data?.error?.message);
      if (error?.response?.data?.error?.message == '' || error?.response?.data?.error?.message == undefined) {
        return true;
      }

      return error;
    }
  }

  async status(statusRequestDto: StatusRequestDto) {
    try {
      const initResponse = (await this.httpService.post(this.getUrl.getGclStatusUrl, statusRequestDto))?.data;
      return initResponse;
    } catch (error) {
      this.logger.log('error?.response?.data?.error?.message', error?.response?.data?.error?.message);
      if (error?.response?.data?.error?.message == '' || error?.response?.data?.error?.message == undefined) {
        return true;
      }

      return error;
    }
  }

  async rate(rateRequestDto: RateRequestDto) {
    try {
      const rateResponse = await this.httpService.post(this.getUrl.getGclRateUrl, rateRequestDto);
      this.logger.log('rateResponse', rateResponse);
      return rateResponse;
    } catch (error) {
      this.logger.log('error?.response?.data?.error?.message', error?.response?.data?.error?.message);
      if (error?.response?.data?.error?.message == '' || error?.response?.data?.error?.message == undefined) {
        return true;
      }

      return error;
    }
  }

  async cancel(cancelRequestDto: CancelRequestDto) {
    try {
      const cancelResponse = await this.httpService.post(this.getUrl.getGclCancelUrl, cancelRequestDto);
      this.logger.log('cancelResponse', cancelResponse);
      return cancelResponse;
    } catch (error) {
      this.logger.log('error?.response?.data?.error?.message', error?.response?.data?.error?.message);
      if (error?.response?.data?.error?.message == '' || error?.response?.data?.error?.message == undefined) {
        return true;
      }

      return error;
    }
  }

  async update(updateRequestDto: UpdateRequestDto) {
    try {
      const updateResponse = await this.httpService.post(this.getUrl.getGclUpdateUrl, updateRequestDto);
      this.logger.log('updateResponse', updateResponse);
      return updateResponse;
    } catch (error) {
      this.logger.log('error?.response?.data?.error?.message', error?.response?.data?.error?.message);
      if (error?.response?.data?.error?.message == '' || error?.response?.data?.error?.message == undefined) {
        return true;
      }

      return error;
    }
  }

  async support(supportRequestDto: SupportRequestDto) {
    try {
      const supportResponse = await this.httpService.post(this.getUrl.getGclSupportUrl, supportRequestDto);
      this.logger.log('supportResponse', supportResponse);
      return supportResponse;
    } catch (error) {
      this.logger.log('error?.response?.data?.error?.message', error?.response?.data?.error?.message);
      if (error?.response?.data?.error?.message == '' || error?.response?.data?.error?.message == undefined) {
        return true;
      }

      return error;
    }
  }

  async track(trackRequestDto: TrackRequestDto) {
    try {
      const trackResponse = await this.httpService.post(this.getUrl.getGclTrackUrl, trackRequestDto);
      this.logger.log('trackResponse', trackResponse);
      return trackResponse;
    } catch (error) {
      this.logger.log('error?.response?.data?.error?.message', error?.response?.data?.error?.message);
      if (error?.response?.data?.error?.message == '' || error?.response?.data?.error?.message == undefined) {
        return true;
      }

      return error;
    }
  }

  async onSearch(onSearchRequestDto: any) {
    try {
      const onSearchResponse = await this.httpService.post(this.getUrl.getIlOnSearchUrl, onSearchRequestDto);
      this.logger.log('onSearchResponse: ', onSearchResponse);
      return onSearchResponse;
    } catch (error) {
      this.logger.error('Error while onSearch', error?.response);
      error.response.data.targetLanguageCode = this.serverDefaultLanguage;
      throw error?.response?.data;
    }
  }

  async onSelect(selectResponseDto: any) {
    try {
      const selectResponse = await this.httpService.post(this.getUrl.getIlOnSelectUrl, selectResponseDto);
      this.logger.log('onSelectResponse', selectResponse);
      return selectResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      error.response.data.targetLanguageCode = this.serverDefaultLanguage;
      throw error?.response?.data;
    }
  }

  async onInit(initRequestDto: any) {
    try {
      this.logger.log('onInit received', initRequestDto);
      const initResponse = await this.httpService.post(this.getUrl.getIlOnInitUrl, initRequestDto);
      this.logger.log('onInitResponse', initResponse);
      return initResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      error.response.data.targetLanguageCode = this.serverDefaultLanguage;
      throw error?.response?.data;
    }
  }

  async onConfirm(confirmRequestDto: any) {
    try {
      const initResponse = (await this.httpService.post(this.getUrl.getIlOnConfirmUrl, confirmRequestDto))?.data;
      return initResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      error.response.data.targetLanguageCode = this.serverDefaultLanguage;
      throw error?.response?.data;
    }
  }
  async onStatus(confirmRequestDto: any) {
    try {
      const initResponse = (await this.httpService.post(this.getUrl.getIlOnStatusUrl, confirmRequestDto))?.data;
      return initResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      error.response.data.targetLanguageCode = this.serverDefaultLanguage;
      throw error?.response?.data;
    }
  }

  async onRate(confirmRequestDto: any) {
    try {
      const rateResponse = (await this.httpService.post(this.getUrl.getIlOnRateUrl, confirmRequestDto))?.data;
      return rateResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      throw error?.response?.data;
    }
  }

  async onCancel(confirmRequestDto: any) {
    try {
      const cancelResponse = (await this.httpService.post(this.getUrl.getIlOnCancelUrl, confirmRequestDto))?.data;
      return cancelResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      error.response.data.targetLanguageCode = this.serverDefaultLanguage;
      throw error?.response?.data;
    }
  }

  async onTrack(confirmRequestDto: any) {
    try {
      const trackResponse = (await this.httpService.post(this.getUrl.getIlOnTrackUrl, confirmRequestDto))?.data;
      return trackResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      error.response.data.targetLanguageCode = this.serverDefaultLanguage;
      throw error?.response?.data;
    }
  }

  async onUpdate(confirmRequestDto: any) {
    try {
      const onUpdateResponse = (await this.httpService.post(this.getUrl.getIlOnUpdateUrl, confirmRequestDto))?.data;
      return onUpdateResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      error.response.data.targetLanguageCode = this.serverDefaultLanguage;
      throw error?.response?.data;
    }
  }
}
