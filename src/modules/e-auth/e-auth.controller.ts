// Import necessary decorators, services, and DTOs
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EAuthService } from './e-auth.service';
import { CreateEAuthDto } from './dto/create-e-auth.dto';
import { ExtractToken } from '../../common/decorators/extract-token.decorator';
import { CallBackQueryDto } from '../app/dto/callback-query.dto';
import { Public } from '../../common/decorators/public.decorators';

// Define the EAuthController with necessary routes and decorators
@ApiTags('E-auth')
@Controller('e-auth')
export class EAuthController {
  constructor(private readonly eAuthService: EAuthService) {}

  // Route to get user details
  @Get('/getUser')
  getUser(@Query() createEAuthDto: CreateEAuthDto) {
    return this.eAuthService.getUser(createEAuthDto);
  }

  // Route to get list of providers
  @Get()
  getProviders(@ExtractToken() token: string) {
    return this.eAuthService.getProviders(token);
  }

  @Public()
  @Get('/callback')
  aadhaarCallback(@Query() callBackQueryDto: CallBackQueryDto) {
    return this.eAuthService.updateUserOnCallBack(callBackQueryDto);
  }
}
