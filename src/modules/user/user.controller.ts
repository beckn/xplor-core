// Import necessary decorators and components from NestJS
import { Controller, Get, Post, Body, Patch, Put, Query, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ExtractToken } from '../../common/decorators/extract-token.decorator';
import {
  AssignRoleDto,
  CreateDevicePreferenceDto,
  CreateLanguageDto,
  CreateUserDto,
  KycDetailsDto,
  QueryOtpTypeDto,
  QueryUserProfile,
  ResetMpinDto,
  UpdateDevicePreferenceDto,
} from './dto';
import { Public } from '../../common/decorators/public.decorators';
import { CreateMPinDto } from './dto/create-mpin.dto';
import { ExtractUserId } from '../../common/decorators/extract-userId';
import { DeviceIdDto } from '../../common/utils/dto/device-dto';

// Define the UserController with API tags for Swagger documentation
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint to send OTP
  @Public()
  @Post('/send-otp')
  sendOtp(@Body() phoneNumber: PhoneNumberDto) {
    return this.userService.sendOtp(phoneNumber);
  }

  // Endpoint to send MPIN OTP
  @Put('/send-mpin-otp')
  sendMpinOtp(@ExtractToken() token: string) {
    return this.userService.sendMpinOtp(token);
  }

  // Endpoint to verify OTP
  @Public()
  @Post('/verify-otp')
  verifyOtp(
    @ExtractToken() token: string,
    @Query() queryOtpTypeDto: QueryOtpTypeDto,
    @Body() verifyOtpDto: VerifyOtpDto,
  ) {
    return this.userService.verifyOtp(token, queryOtpTypeDto, verifyOtpDto);
  }

  @Put('/reset-mpin')
  resetMpin(@ExtractToken() token: string, @Body() resetMpinDto: ResetMpinDto) {
    return this.userService.resetMpin(token, resetMpinDto);
  }

  // Endpoint to get user journey
  @Get('journey')
  getUserJourney(@ExtractToken() token: string) {
    return this.userService.getUserJourney(token);
  }

  // Endpoint to find roles
  @Get('roles')
  @Public()
  findRoles(@Query() deviceIdDto: DeviceIdDto) {
    return this.userService.findRoles(deviceIdDto);
  }

  // Endpoint to assign role
  @Patch('role')
  assignRole(@Body() assignRoleDto: AssignRoleDto, @ExtractToken() token: string) {
    return this.userService.assignRole(assignRoleDto, token);
  }

  // Endpoint to update user KYC
  @Patch('kyc')
  updateUserKyc(@ExtractToken() token: string, @Body() kycData: KycDetailsDto) {
    return this.userService.updateUserKyc(token, kycData);
  }

  // Endpoint to get user details
  @Get()
  getUser(@ExtractToken() token: string, @Query() query: QueryUserProfile) {
    return this.userService.findOne(token, query);
  }

  // Endpoint to create MPIN
  @Post('create-mpin')
  createMPin(@ExtractToken() token: string, @Body() mPin: CreateMPinDto) {
    return this.userService.createMPin(token, mPin);
  }

  // Endpoint to verify MPIN
  @Put('verify-mpin')
  verifyMPin(@ExtractToken() token: string, @Body() mPin: CreateMPinDto) {
    return this.userService.verifyMPin(token, mPin);
  }

  // Endpoint to get refresh token
  @Public()
  @Get('access-token')
  getAccessToken(@ExtractToken() token: string) {
    return this.userService.getAccessToken(token);
  }

  // Endpoint to logout user
  @Put('logout')
  logoutUser(@ExtractToken() token: string) {
    return this.userService.logoutUser(token);
  }

  // Endpoint to create user
  @Public()
  @Post()
  createUser(@ExtractToken() token: string, @ExtractUserId() userId: string, @Body() user: CreateUserDto) {
    return this.userService.createUser(token, userId, user);
  }

  @Patch('language-preference')
  updateUserLanguagePreference(@ExtractToken() token: string, @Body() createLanguageDto: CreateLanguageDto) {
    return this.userService.updateUserLanguagePreference(token, createLanguageDto);
  }

  @Public()
  @Post('device-preference')
  createDevicePreference(@Body() createDevicePreferenceDto: CreateDevicePreferenceDto) {
    return this.userService.createDevicePreference(createDevicePreferenceDto);
  }

  @Public()
  @Patch('device-preference')
  updateDevicePreference(@Body() updateDevicePreferenceDto: UpdateDevicePreferenceDto) {
    return this.userService.updateDevicePreference(updateDevicePreferenceDto);
  }

  @Public()
  @Get('device-preference/:id')
  getDevicePreferenceByDeviceId(@Param('id') deviceId: string) {
    return this.userService.getDevicePreferenceById(deviceId);
  }
}
