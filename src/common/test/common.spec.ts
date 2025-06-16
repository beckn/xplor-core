// Import necessary modules and utilities for testing.
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from '../common.module';
import { GetUrl } from '../utils';
import { UserModule } from '../../modules/user/user.module';
import { TokenGuard } from '../guard/token.guard';
import { JwtModule } from '@nestjs/jwt';

// Define a test suite for the CommonModule.
describe('CommonModule', () => {
  // Declare a variable to hold the testing module instance.
  let module: TestingModule;

  // Setup before each test case.
  beforeEach(async () => {
    // Create a testing module that imports the CommonModule, HttpModule, and UserModule.
    // Also, provide the TokenGuard as a provider and set it as a global guard.
    module = await Test.createTestingModule({
      imports: [
        CommonModule,
        HttpModule,
        ConfigModule.forRoot({ isGlobal: true }),
        { module: JwtModule, global: true },
        { module: HttpModule, global: true },
        UserModule,
      ], // Import the module to be tested
      providers: [
        TokenGuard,
        {
          provide: APP_GUARD,
          useClass: TokenGuard,
        },
      ],
      // exports: [GetUrl, TokenGuard],
    }).compile();
  });

  // Test case to ensure the module is defined.
  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  // Test case to ensure the GetUrl utility is provided by the module.
  it('should provide GetUrl', () => {
    const getUrl = module.get(GetUrl);
    expect(getUrl).toBeInstanceOf(GetUrl);
  });

  // Test case to ensure the GetUrl utility is exported by the module.
  it('should export GetUrl', () => {
    const getUrl = module.get(GetUrl);
    expect(getUrl).toBeDefined();
  });
});
