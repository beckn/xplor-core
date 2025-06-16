import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { GetUrl } from '../get-urls-utils.service';

@Injectable()
export class GetDeviceService {
  constructor(private readonly httpService: HttpService, private readonly getUrl: GetUrl) {}

  async getDevicePreferenceById(deviceId: string) {
    if (!deviceId) return {};
    return (await this.httpService.axiosRef.get(this.getUrl.getDevicePreferenceUrl + `/${deviceId}`))?.data?.data;
  }
}
