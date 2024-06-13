import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EAuthModule } from '../e-auth/e-auth.module';
import { UserModule } from '../user/user.module';
import configuration from '../../config/env/env.config';
import envValidation from '../../config/env/validation/env.validation';
import { CommonModule } from '../../common/common.module';
import { WalletModule } from '../wallet/wallet.module';
import { GetUrl } from '../../common/utils/get-urls-utils.service';
import { TokenGuard } from '../../common/guard/token.guard';
import { AiMlModule } from '../ai-ml/ai-ml.module';
import { StgModule } from '../stg/stg.module';
import { JwtModule } from '@nestjs/jwt';

/**
 * AppModule is the root module of the application.
 * It imports and configures other modules, controllers, and providers needed for the application to run.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object(envValidation()),
      validationOptions: {
        abortEarly: false,
      },
    }),
    { module: JwtModule, global: true },
    EAuthModule,
    UserModule,
    CommonModule,
    WalletModule,
    AiMlModule,
    StgModule,
    { module: HttpModule, global: true },
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GetUrl,
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
})
export class AppModule {}
