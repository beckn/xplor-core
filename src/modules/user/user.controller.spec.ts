// Import necessary modules and components for testing
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { CreateMPinDto, KycDetailsDto, QueryOtpTypeDto, VerifyOtpDto } from './dto';
import { DeviceIdDto } from '../../../src/common/utils/dto/device-dto';

// Define the test suite for UserController
describe('UserController', () => {
  let controller: UserController;

  const findRoles = {
    success: true,
    message: 'OK',
    data: [
      {
        _id: `role_${faker.string.uuid()}`,
        type: faker.person.jobTitle(),
        updated_at: new Date(),
        created_at: new Date(),
        __v: 0,
      },
      {
        _id: `role_${faker.string.uuid()}`,
        type: faker.person.jobTitle(),
        updated_at: new Date(),
        created_at: new Date(),
        __v: 0,
      },
    ],
  };
  const sendOtp = {
    success: true,
    data: {
      key: faker.string.uuid(),
      otp: '191067',
    },
    message: 'OK',
  };

  const verifyOtp = {
    success: true,
    message: 'OK',
    data: {
      accessToken: `Bearer jwt_token_${faker.string.uuid()}`,
      userId: `user_${faker.string.uuid()}`,
    },
  };
  const resendOtp = {
    success: true,
    message: 'OK',
    data: {
      token: `Bearer jwt_token_${faker.string.uuid()}`,
      userId: `user_${faker.string.uuid()}`,
    },
  };
  const assignRole = {
    _id: `user_${faker.string.uuid()}`,
    phoneNumber: faker.phone.number(),
    verified: true,
    kycStatus: false,
    wallet: null,
    updated_at: new Date(),
    created_at: new Date(),
    __v: 0,
    role: {
      _id: `role_${faker.string.uuid()}`,
      type: faker.person.jobTitle(),
      updated_at: new Date(),
      created_at: new Date(),
      __v: 0,
    },
  };
  const updateRole = {
    success: true,
    message: 'OK',
    data: {
      _id: `user_${faker.string.uuid()}`,
      phoneNumber: faker.phone.number(),
      verified: true,
      kycStatus: true,
      wallet: null,
      updated_at: new Date(),
      created_at: new Date(),
      __v: 0,
      role: `role_${faker.string.uuid()}`,
      kyc: {
        firstName: faker.person.firstName(),
        address: faker.location.streetAddress(),
        email: faker.internet.email(),
        gender: faker.person.gender(), // Randomly select 'Male' or 'Female' gender
        provider: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
        },
        _id: `kyc_${faker.string.uuid()}`,
        updated_at: new Date(),
        created_at: new Date(),
      },
    },
  };

  const mockCreateMpin = {
    success: true,
    message: 'Created',
    data: {
      _id: 'user_ce6134e2-cea7-4497-8aab-352a6a2afe35',
      phoneNumber: '+917350379500',
      verified: true,
      kycStatus: false,
      wallet: 'wallet_694a2b00-c85d-4c74-9727-ffa7bfc768b3',
      mPin: '$argon2id$v=19$m=65536,t=3,p=4$nhAJLz+/3CP6ZQS22C27gA$SydhG+iCNtVfz3e3pTXHUBh+6QD/iEajjDS1ZAIj8Bo',
      updated_at: '2024-04-17T15:09:50.317Z',
      created_at: '2024-04-17T15:09:50.317Z',
      __v: 0,
      role: 'role_d7388176-0779-45f2-b9ab-6fe40f627640',
    },
  };

  const mockVerifiedMpin = {
    success: true,
    message: 'Verification Successful',
    data: {
      verified: true,
    },
  };

  const mockUserLogoutResponse = {
    success: true,
    message: 'OK',
    data: {
      userId: faker.string.uuid(),
    },
  };

  const mockGetAccessTokenResponse = {
    success: true,
    message: 'OK',
    data: {
      accessToken:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX2ZkZmU2MmQ4LWZjYjYtNGQyZS1iNGE4LTM4YjVmYTg2NGRkMiIsImlhdCI6MTcxMzg1NjExNSwiZXhwIjoxNzEzODU2MTc1fQ._T1syReb5y5db4P3GAJoXU64SsK8OE79gJrq4bsBg_Y',
    },
  };

  // Setup the testing module before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            sendOtp: jest.fn().mockResolvedValue(sendOtp),
            verifyOtp: jest.fn().mockResolvedValue(verifyOtp),
            resendOtp: jest.fn().mockResolvedValue(resendOtp),
            findRoles: jest.fn().mockResolvedValue(findRoles),
            assignRole: jest.fn().mockResolvedValue(assignRole),
            updateUserKyc: jest.fn().mockResolvedValue(updateRole),
            getAccessToken: jest.fn().mockResolvedValue(mockGetAccessTokenResponse),
            createMPin: jest.fn().mockResolvedValue(mockCreateMpin),
            verifyMPin: jest.fn().mockResolvedValue(mockVerifiedMpin),
            logoutUser: jest.fn().mockResolvedValue(mockUserLogoutResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    // service = module.get<UserService>(UserService);
  });

  // Test to ensure the controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test cases for each method in the UserController

  describe('sendOtp', () => {
    it('should send OTP', async () => {
      const phoneNumberDto: PhoneNumberDto = {
        phoneNumber: faker.phone.number(),
        targetLanguageCode: 'hi',
        deviceId: '12345',
      };
      expect(await controller.sendOtp(phoneNumberDto)).toEqual(sendOtp);
    });
  });

  describe('verifyOtp', () => {
    it('should verify OTP', async () => {
      const verifyOtpDto: VerifyOtpDto = {
        key: faker.string.uuid(),
        otp: faker.number.int({ min: 100000, max: 999999 }).toString(),
      };
      const otp = 'otp';
      const query = new QueryOtpTypeDto();
      expect(await controller.verifyOtp(otp, query, verifyOtpDto)).toEqual(verifyOtp);
    });
  });

  describe('findRoles', () => {
    it('should find roles', async () => {
      const deviceIdDto: DeviceIdDto = {
        deviceId: '12345',
      };
      expect(await controller.findRoles(deviceIdDto)).toEqual(findRoles);
    });
  });
  describe('assignRole', () => {
    it('should assign role to user', async () => {
      const assignRoleDto: AssignRoleDto = {
        roleId: `role_${faker.string.uuid()}`,
      };
      const token = 'mockToken';
      expect(await controller.assignRole(assignRoleDto, token)).toEqual(assignRole);
    });
  });

  describe('updateUserKyc', () => {
    it('should update user KYC', async () => {
      const token = 'mockToken';
      const kycData = new KycDetailsDto();
      kycData.address = faker.string.alphanumeric();
      kycData.dob = faker.string.numeric();
      kycData.email = faker.person.fullName();
      kycData.firstName = faker.person.firstName();
      kycData.gender = faker.person.gender();
      kycData.lastName = faker.person.lastName();

      expect(await controller.updateUserKyc(token, kycData)).toEqual(updateRole);
    });
  });

  describe('createMPin', () => {
    it('should successfully create an MPIN', async () => {
      const token = 'mockToken';
      const mPinDto: CreateMPinDto = {
        mPin: '123456',
      };

      expect(await controller.createMPin(token, mPinDto)).toEqual(mockCreateMpin);
    });
  });

  describe('verifyMPin', () => {
    it('should successfully verify an MPIN', async () => {
      const token = 'mockToken';
      const mPinDto: CreateMPinDto = {
        mPin: '123456',
      };

      expect(await controller.verifyMPin(token, mPinDto)).toEqual(mockVerifiedMpin);
    });
  });

  describe('getAccessToken', () => {
    it('should successfully get a refresh token', async () => {
      const token = 'mockToken';

      expect(await controller.getAccessToken(token)).toEqual(mockGetAccessTokenResponse);
    });
  });

  describe('logoutUser', () => {
    it('should successfully logout a user', async () => {
      const token = 'mockToken';

      expect(await controller.logoutUser(token)).toEqual(mockUserLogoutResponse);
    });
  });
});
