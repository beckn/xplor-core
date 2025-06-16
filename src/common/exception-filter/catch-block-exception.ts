import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TranslateService } from '../utils/translate/translate.service';

@Catch()
export class CatchExceptionsTranslator implements ExceptionFilter {
  constructor(private readonly configService: ConfigService, private readonly translateService: TranslateService) {}
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const getServerDefaultLanguage = this.configService.get<string>('DEFAULT_LANGUAGE').replaceAll(' ', '');

    // eslint-disable-next-line no-console
    console.log('exception====================================', JSON.stringify(exception));

    let translatedMessage: any = exception?.message;

    if (exception.targetLanguageCode && exception.targetLanguageCode !== getServerDefaultLanguage) {
      translatedMessage = await this.translateService.translateLanguage({
        text: exception.message,
        to_ln: exception.targetLanguageCode ? exception.targetLanguageCode : getServerDefaultLanguage,
        from_ln: getServerDefaultLanguage,
      });
      exception.message = translatedMessage;
    } else {
      exception.message = translatedMessage;
    }

    const status =
      exception && exception.statusCode
        ? exception.statusCode
        : exception.response && exception.response.statusCode
        ? exception.response.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json(exception.response ? exception.response : exception);
  }
}
