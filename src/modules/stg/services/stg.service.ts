/* eslint-disable no-console */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchRequestDto } from '../dto/search-request.dto';
import { GetUrl } from '../../../common/utils';
import { TranslateService } from '../../../common/utils/translate/translate.service';
import { GetDeviceService } from '../../../common/utils/getDevice/get-device';
import { SelectRequestDto } from '../dto/select-request.dto';
import { InitRequestDto } from '../dto/init-request.dto';
import { ConfirmRequestDto } from '../dto/confirm-request.dto';
import { AxiosService } from '../../../common/axios/axios.service';
import { StatusRequestDto } from '../dto/status-request.dto';

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
      this.deviceIdMapper.set(searchRequestDto?.context?.transaction_id, searchRequestDto.deviceId);

      const searchResponse = await this.httpService.post(this.getUrl.getStgSearchUrl, searchRequestDto);
      return searchResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      throw error?.response?.data;
    }
  }

  async select(selectRequestDto: SelectRequestDto) {
    try {
      const selectResponse = await this.httpService.post(this.getUrl.getStgSelectUrl, selectRequestDto);
      this.logger.log('selectResponse', selectResponse);
      return selectResponse;
    } catch (error) {
      this.logger.error(error);
      error.response.data.targetLanguageCode = 'en';
      throw error?.response;
    }
  }

  async init(initRequestDto: InitRequestDto) {
    try {
      this.logger.log('initRequestDto', initRequestDto);
      const initResponse = (await this.httpService.post(this.getUrl.getStgInitUrl, initRequestDto))?.data;
      return initResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      throw error?.response?.data;
    }
  }

  async confirm(confirmRequestDto: ConfirmRequestDto) {
    try {
      const initResponse = (await this.httpService.post(this.getUrl.getStgConfirmUrl, confirmRequestDto))?.data;
      return initResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      throw error?.response?.data;
    }
  }

  async status(statusRequestDto: StatusRequestDto) {
    try {
      const initResponse = (await this.httpService.post(this.getUrl.getStgStatusUrl, statusRequestDto))?.data;
      return initResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      throw error?.response?.data;
    }
  }

  async onSearch(
    searchRequestDto: any,
    connectedClients: Map<string, any>,
    sendDataToClients: (transaction_id: string, data: any, connectedClients: Map<string, any>) => void,
  ) {
    try {
      this.logger.log('onSearchService11', this.getUrl.getIlOnSearchUrl);
      const deviceId = this.deviceIdMapper.get(searchRequestDto?.context?.transaction_id);
      const deviceInfo = await this.getDeviceService.getDevicePreferenceById(deviceId);
      this.logger.log('onSearchService22', deviceInfo);
      const targetLanguageCode = deviceInfo?.languageCode || this.serverDefaultLanguage;
      // Send this response in SSE/Socket to the mobile app
      await this.translation.translateItemPayload(searchRequestDto?.data, targetLanguageCode);
      sendDataToClients(searchRequestDto?.context?.transaction_id, searchRequestDto?.data, connectedClients);
      await this.httpService.post(this.getUrl.getIlOnSearchUrl, searchRequestDto);
      // console.log('onsearchResponse', onsearchResponse);
      this.logger.log('searchRequestDto==========', JSON.stringify(searchRequestDto));
      return searchRequestDto;
    } catch (error) {
      this.logger.error(error?.response?.data);
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
      throw error?.response?.data;
    }
  }

  async onInit(initRequestDto: any) {
    try {
      this.logger.log('oninit recieved', initRequestDto);
      const initResponse = await this.httpService.post(this.getUrl.getIlOnInitUrl, initRequestDto);
      this.logger.log('onInitResponse', initResponse);
      return initResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      throw error?.response?.data;
    }
  }

  async onConfirm(confirmRequestDto: any) {
    try {
      const initResponse = (await this.httpService.post(this.getUrl.getIlOnConfirmUrl, confirmRequestDto))?.data;
      return initResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      throw error?.response?.data;
    }
  }
  async onStatus(confirmRequestDto: any) {
    try {
      const initResponse = (await this.httpService.post(this.getUrl.getIlOnStatusUrl, confirmRequestDto))?.data;
      return initResponse;
    } catch (error) {
      this.logger.error(error?.response?.data);
      throw error?.response?.data;
    }
  }
}
