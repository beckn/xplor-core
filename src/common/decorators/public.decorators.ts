import { SetMetadata } from '@nestjs/common';

import { PublicDecoratorMessage } from '../constants/public.message';

export const IS_PUBLIC_KEY = PublicDecoratorMessage.IsPublic;
export const Public = () => SetMetadata('isPublic', true);
