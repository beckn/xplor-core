import { Test, TestingModule } from '@nestjs/testing';

import { AiMlController } from './ai-ml.controller';
import { AiMlService } from './ai-ml.service';

describe('AiMlController', () => {
  let controller: AiMlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiMlController],
      providers: [
        {
          provide: AiMlService,
          useValue: {
            translateLanguage: jest.fn(),
            getSupportedLanguages: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AiMlController>(AiMlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
