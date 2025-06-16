import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EAuthService } from '../e-auth/e-auth.service';
import { GetUrl } from '../../common/utils/get-urls-utils.service'; // Adjust the import path as necessary
import {} from '../../../src/common/utils';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, JwtModule.register({ global: true }), ConfigModule.forRoot({ isGlobal: true })],
      controllers: [AppController],
      providers: [AppService, EAuthService, GetUrl], // Include GetUrl here
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return server status as "ok"', () => {
      expect(appController.getHealth().status).toBe('ok');
    });
  });
});
