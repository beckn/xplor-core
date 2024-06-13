import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { TranslateDto } from '../dto/translate';
import { extractKeys } from '../extract-keys/extract-keys';
import {
  KeysFromItems,
  keysFromJob,
  keysFromRetail,
  keysFromScholarship,
} from '../../constants/keys-to-translate/translate';
import { Endpoints } from '../../constants/endpoint';

@Injectable()
export class TranslateService {
  private readonly logger: Logger = new Logger(TranslateService.name);
  private readonly serverDefaultLanguage: string;
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
    this.serverDefaultLanguage = this.configService.get('serverDefaultLanguage');
  }

  async translateLanguage(translateDto: TranslateDto) {
    try {
      const url = (this.configService.get('LANGUAGE_SERVICE_URL') + Endpoints.translateLanguageUrl).replaceAll(' ', '');
      if (translateDto.to_ln === translateDto.from_ln) {
        return translateDto.text;
      }

      this.logger.log('translateDto=============', JSON.stringify(translateDto));
      return (await this.httpService.axiosRef.post(url, translateDto))?.data?.translated_text;
    } catch (error) {
      this.logger.error('error in translateLanguage', error);
      throw error?.response?.data;
    }
  }
  async translateArrayWithKeysToLanguage(data: any[], keys: string[], targetLanguageCode: string) {
    try {
      return await Promise.all(
        data.map(async (value: any) => {
          // this.logger.log('value', value);
          const clonedValue = JSON.parse(JSON.stringify(value));
          const keysToTranslate: any = extractKeys(clonedValue, keys);
          this.logger.log('keysToTranslate', keysToTranslate);
          const response = await this.translateLanguage({
            to_ln: targetLanguageCode,
            from_ln: this.serverDefaultLanguage,
            text: keysToTranslate,
          });
          this.logger.log('translateLanguage response', response);
          this.logger.log('Object.assign(clonedValue, response)', JSON.stringify(Object.assign(clonedValue, response)));
          return Object.assign(clonedValue, response);
        }),
      );
    } catch (error) {
      this.logger.error(error?.response?.data);
      error.response.data.targetLanguageCode = targetLanguageCode;
      throw error?.response?.data;
    }
  }

  async translateNestedArrayObjectPayload(data: any[], keysToTranslate: string[], targetLanguageCode: string) {
    return await Promise.all(
      data.map(async (value) => {
        const flattenedDataList = this.extractKeysAndValues(value, keysToTranslate);

        const translatedData = await this.translateLanguage({
          to_ln: targetLanguageCode,
          from_ln: this.serverDefaultLanguage,
          text: flattenedDataList,
        });
        const updatedItemsData = this.updateDataWithExtractedValues(value, translatedData);

        return updatedItemsData;
      }),
    );
  }
  async translateItemPayload(data: any, targetLanguageCode: string) {
    try {
      if (data?.course.message) {
        if (data?.course?.message?.catalog?.providers) {
          const providersArray = data?.course?.message?.catalog?.providers;
          const updateProvidersItems = await Promise.all(
            providersArray.map(async (provider) => {
              return await Promise.all(
                provider.items.map(async (value: any) => {
                  // this.logger.log('value=====================', JSON.stringify(value), '==================value');
                  const flattenedDataList = this.extractKeysAndValues(value, KeysFromItems);
                  // this.logger.log('flattenedDataList', flattenedDataList);

                  const translatedData = await this.translateLanguage({
                    to_ln: targetLanguageCode,
                    from_ln: this.serverDefaultLanguage,
                    text: flattenedDataList,
                  });
                  // this.logger.log(translatedData);

                  const updatedItemsData = this.updateDataWithExtractedValues(value, translatedData);
                  // this.logger.log(
                  //   'updatedItemsData====================',
                  //   JSON.stringify(updatedItemsData),
                  //   '====================updatedItemsData',
                  // );
                  return updatedItemsData;
                }),
              );
            }),
          );
          const updatedProvidersItems = updateProvidersItems;
          // this.logger.log(
          //   'updateProvidersItems==========================',
          //   updatedProvidersItems,
          //   '==============================updateProvidersItems',
          // );
          return {
            message: {
              ...data?.message,
              order: {
                ...data?.message?.order,
                providers: updatedProvidersItems,
              },
            },
            ...data,
          };
        } else {
          return {};
        }
      }

      if (data?.scholarship?.message) {
        // this.logger.log('data.scholarship', data.scholarship)
        if (data?.scholarship?.message?.catalog?.providers) {
          const providersArray = data?.scholarship?.message?.catalog?.providers;
          const updateProvidersItems = await Promise.all(
            providersArray.map(async (provider) => {
              return await Promise.all(
                provider.items.map(async (value: any) => {
                  // this.logger.log('value=====================', JSON.stringify(value), '==================value');
                  // this.logger.log('keysFromScholarship', keysFromScholarship)
                  const flattenedDataList = this.extractKeysAndValues(value, keysFromScholarship);
                  // this.logger.log('flattenedDataList', flattenedDataList);

                  const translatedData = await this.translateLanguage({
                    to_ln: targetLanguageCode,
                    from_ln: this.serverDefaultLanguage,
                    text: flattenedDataList,
                  });
                  // this.logger.log(translatedData);

                  const updatedItemsData = this.updateDataWithExtractedValues(value, translatedData);
                  // this.logger.log(
                  //   'updatedItemsData====================',
                  //   JSON.stringify(updatedItemsData),
                  //   '====================updatedItemsData',
                  // );
                  return updatedItemsData;
                }),
              );
            }),
          );
          const updatedProvidersItems = updateProvidersItems;
          // this.logger.log(
          //   'updateProvidersItems==========================',
          //   updatedProvidersItems,
          //   '==============================updateProvidersItems',
          // );
          return {
            message: {
              ...data?.message,
              order: {
                ...data?.message?.order,
                providers: updatedProvidersItems,
              },
            },
            ...data,
          };
        } else {
          return {};
        }
      }

      if (data?.job?.message) {
        if (data?.job?.message?.catalog?.providers) {
          const providersArray = data?.job?.message?.catalog?.providers;
          const updateProvidersItems = await Promise.all(
            providersArray.map(async (provider) => {
              return await Promise.all(
                provider.items.map(async (value: any) => {
                  // this.logger.log('value=====================', JSON.stringify(value), '==================value');
                  // this.logger.log('keysFromScholarship', keysFromScholarship)
                  const flattenedDataList = this.extractKeysAndValues(value, keysFromJob);
                  // this.logger.log('flattenedDataList', flattenedDataList);

                  const translatedData = await this.translateLanguage({
                    to_ln: targetLanguageCode,
                    from_ln: this.serverDefaultLanguage,
                    text: flattenedDataList,
                  });
                  // this.logger.log(translatedData);

                  const updatedItemsData = this.updateDataWithExtractedValues(value, translatedData);
                  // this.logger.log(
                  //   'updatedItemsData====================',
                  //   JSON.stringify(updatedItemsData),
                  //   '====================updatedItemsData',
                  // );
                  return updatedItemsData;
                }),
              );
            }),
          );
          const updatedProvidersItems = updateProvidersItems;
          // this.logger.log(
          //   'updateProvidersItems==========================',
          //   updatedProvidersItems,
          //   '==============================updateProvidersItems',
          // );
          return {
            message: {
              ...data?.message,
              order: {
                ...data?.message?.order,
                providers: updatedProvidersItems,
              },
            },
            ...data,
          };
        } else {
          return {};
        }
      }

      if (data?.retail?.message) {
        if (data?.retail?.message?.catalog?.providers) {
          const providersArray = data?.retail?.message?.catalog?.providers;
          const updateProvidersItems = await Promise.all(
            providersArray.map(async (provider) => {
              return await Promise.all(
                provider.items.map(async (value: any) => {
                  // this.logger.log('value=====================', JSON.stringify(value), '==================value');
                  const flattenedDataList = this.extractKeysAndValues(value, keysFromRetail);
                  // this.logger.log('flattenedDataList', flattenedDataList);

                  const translatedData = await this.translateLanguage({
                    to_ln: targetLanguageCode,
                    from_ln: this.serverDefaultLanguage,
                    text: flattenedDataList,
                  });
                  // this.logger.log(translatedData);

                  const updatedItemsData = this.updateDataWithExtractedValues(value, translatedData);
                  // this.logger.log(
                  //   'updatedItemsData====================',
                  //   JSON.stringify(updatedItemsData),
                  //   '====================updatedItemsData',
                  // );
                  return updatedItemsData;
                }),
              );
            }),
          );
          const updatedProvidersItems = updateProvidersItems;
          // this.logger.log(
          //   'updateProvidersItems==========================',
          //   updatedProvidersItems,
          //   '==============================updateProvidersItems',
          // );
          return {
            message: {
              ...data?.message,
              order: {
                ...data?.message?.order,
                providers: updatedProvidersItems,
              },
            },
            ...data,
          };
        } else {
          return {};
        }
      }
    } catch (error) {
      this.logger.error(error?.message);
      return error?.message;
    }
  }
  extractKeysAndValues(obj: any[], keysToExtract: Array<string>) {
    const keysAndValues = [];
    function traverse(obj, prefix = '') {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          traverse(obj[key], `${prefix}${key}.`);
        } else {
          const fullKey = `${prefix}${key}`;
          if (keysToExtract.includes(fullKey)) {
            let value = obj[key];
            if (typeof value === 'string') {
              // Remove HTML tags from the string
              value = value.replace(/<[^>]*>/g, '');
            }

            keysAndValues[fullKey] = value;
          }
        }
      }
    }

    traverse(obj);
    return { ...keysAndValues };
  }
  updateDataWithExtractedValues(originalObj: any, replacementObj: any) {
    const mergedObj = { ...originalObj };

    for (const key in replacementObj) {
      const value = replacementObj[key];
      const keys = key.split('.');
      let currentObj = mergedObj;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];

        if (i === keys.length - 1) {
          currentObj[k] = value;
        } else {
          currentObj[k] = currentObj[k] || {};
          currentObj = currentObj[k];
        }
      }
    }

    return mergedObj;
  }
}
