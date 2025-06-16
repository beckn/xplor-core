import { Module } from '@nestjs/common';

import { StgService } from './services/stg.service';
import { StgController } from './stg.controller';
import { GetDeviceService } from '../../common/utils/getDevice/get-device';

@Module({
  controllers: [StgController],
  providers: [StgService, GetDeviceService],
})
export class StgModule {}
