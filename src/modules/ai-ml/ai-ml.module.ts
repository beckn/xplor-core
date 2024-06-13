import { Module } from '@nestjs/common';

import { AiMlService } from './ai-ml.service';
import { AiMlController } from './ai-ml.controller';
import { GetDeviceService } from '../../common/utils/getDevice/get-device';

@Module({
  controllers: [AiMlController],
  providers: [AiMlService, GetDeviceService],
})
export class AiMlModule {}
