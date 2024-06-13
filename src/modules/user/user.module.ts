// Import necessary modules and components from NestJS
import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TranslateService } from '../../common/utils/translate/translate.service';
import { GetDeviceService } from '../../common/utils/getDevice/get-device';
import { GetUserService } from '../../common/utils/getUser/get-user';

// Define the UserModule with its controllers and providers
@Module({
  controllers: [UserController],
  providers: [UserService, TranslateService, GetDeviceService, GetUserService],
  exports: [UserService],
})
export class UserModule {}
