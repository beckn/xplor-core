import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { GetUrl } from '../get-urls-utils.service';

@Injectable()
export class GetUserService {
  constructor(private readonly httpService: HttpService, private readonly getUrl: GetUrl) {}

  async getUserByToken(token: string) {
    return (
      await this.httpService.axiosRef.get(this.getUrl.getUserProfileUrl, {
        headers: {
          Authorization: token,
        },
      })
    )?.data?.data;
  }
}
