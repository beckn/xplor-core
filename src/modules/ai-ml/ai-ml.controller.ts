import { Controller, Get, Body, Post, Query, Delete } from '@nestjs/common';

import { AiMlService } from './ai-ml.service';
import { CreateGuestLanguageDto, QueryDeviceIdDto, TranslateDto } from './dto';
import { Public } from '../../common/decorators/public.decorators';
import { LatLongDto } from '../../common/utils/dto/lat-long.dto';
import { DeviceIdDto } from '../../common/utils/dto/device-dto';

@Public()
@Controller('ai-ml')
export class AiMlController {
  constructor(private readonly aiMlService: AiMlService) {}
  // Endpoint to create device language preference
  @Public()
  @Post('language-preference')
  createDeviceLanguagePreference(@Body() createLanguage: CreateGuestLanguageDto) {
    return this.aiMlService.createDeviceLanguagePreference(createLanguage);
  }

  // Endpoint to get device language preference
  @Public()
  @Get('language-preference')
  getDeviceLanguagePreference(@Query() queryDeviceIdDto: QueryDeviceIdDto) {
    return this.aiMlService.getDeviceLanguagePreference(queryDeviceIdDto);
  }

  // Endpoint to delete device language preference
  @Public()
  @Delete('language-preference')
  deleteDeviceLanguagePreference(@Query() queryDeviceIdDto: QueryDeviceIdDto) {
    return this.aiMlService.deleteDeviceLanguagePreference(queryDeviceIdDto);
  }

  // Endpoint to get supported languages
  @Get('supported-languages')
  getAllSupportedLanguage() {
    return this.aiMlService.getSupportedLanguages();
  }

  // Endpoint to translate language
  @Public()
  @Post('translate')
  translateLanguage(@Body() translate: TranslateDto) {
    return this.aiMlService.translateLanguage(translate);
  }

  // Endpoint to get languages for user
  @Public()
  @Get('languages')
  getLanguagesForUser(@Query() latLongDto: LatLongDto) {
    return this.aiMlService.getLanguagesForUser(latLongDto);
  }

  // Endpoint to get domains
  @Public()
  @Get('domains')
  getDomains(@Query() deviceIdDto: DeviceIdDto) {
    return this.aiMlService.getDomains(deviceIdDto);
  }

  // Endpoint to get categories
  @Public()
  @Get('categories')
  getCategories(@Query() deviceIdDto: DeviceIdDto) {
    return this.aiMlService.getCategories(deviceIdDto);
  }
}
