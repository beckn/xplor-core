/* eslint-disable no-console */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateEAuthDto } from './dto/create-e-auth.dto';
import { GetUrl } from '../../common/utils/get-urls-utils.service';
import { IProvider } from './interfaces/provider.interface';
import { ITokenAndUserDetails } from './interfaces';
import { CallBackQueryDto } from '../app/dto/callback-query.dto';
import { ICreateKycDto } from '../app/interface/userDetails';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// Define the EAuthService with necessary methods
@Injectable()
export class EAuthService {
  private readonly logger: Logger;
  constructor(
    private readonly httpService: HttpService,
    private readonly getUrl: GetUrl,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger(EAuthService.name);
  }
  // Method to get user details
  async getUser(createEAuthDto: CreateEAuthDto) {
    try {
      const userDetails: ITokenAndUserDetails = (
        await this.httpService.axiosRef.get(this.getUrl.getUserInfoUrl(createEAuthDto.provider), {
          params: { code: createEAuthDto.code },
        })
      ).data;
      return userDetails;
    } catch (error) {
      this.logger.error('Failed to fetch userDetails', error);
      throw error;
    }
  }

  // Method to get list of providers
  async getProviders(token: string) {
    try {
      const responseData: IProvider[] = (
        await this.httpService.axiosRef.get(this.getUrl.getProvidersUrl, {
          headers: {
            Authorization: token,
          },
        })
      ).data;
      return responseData;
    } catch (error) {
      this.logger.error('Failed to fetch providers', error);
      throw error;
    }
  }

  async getAccessToken(provider: string) {
    try {
      const accessToken: string = (await this.httpService.axiosRef.get(this.getUrl.getUserAccessTokenUrl(provider)))
        .data;
      return accessToken;
    } catch (error) {
      this.logger.error('Failed to fetch accessToken', error);
      throw error;
    }
  }
  // Method to get access token
  // Method to update user on callback
  async updateUserOnCallBack(callBackQueryDto: CallBackQueryDto): Promise<any> {
    try {
      // Extract the token from the state parameter
      const token = callBackQueryDto.state.split(' ')[1];
      // Decode the token to get the user ID
      const userId = this.jwtService.decode(token)?.sub;

      // Log the callback query DTO for debugging purposes
      console.log('callBackQueryDto=========', callBackQueryDto);
      // Fetch user details using the provider and code from the callback query DTO
      const userDetails: any = (
        await this.httpService.axiosRef.get(this.getUrl.getUserInfoUrl(callBackQueryDto.provider), {
          params: callBackQueryDto,
        })
      ).data;
      // Log the fetched user details for debugging purposes
      console.log('userDetails============', userDetails);
      // Check if there's an error in the user details and throw a BadRequestException if so
      // if (userDetails?.error) {
      //   throw new BadRequestException(userDetails?.error);
      // }

      // Retrieve the organization configuration
      const organization = this.configService.get('organization');

      // Create a new wallet for the user
      const createdWalletData = (
        await this.httpService.axiosRef.post(this.getUrl.getWalletUrl, {
          userId: userId,
          fullName: userDetails?.given_name || '',
          email: userDetails?.email || '',
          organization: organization,
        })
      ).data;
      console.log('createdWalletData', createdWalletData);

      // Extract the wallet ID from the created wallet data
      const walletId = createdWalletData?.data?._id;

      // Split the given name into first and last names
      const userName = userDetails.given_name?.split(' ');
      // Prepare the KYC user details for updating
      const kycUserDetails: ICreateKycDto = {
        lastName: userName[userName.length - 1], // Assuming given_name is the last name
        firstName: userName[0], // Assuming given_name is the first name
        email: userDetails.email || '',
        address: JSON.stringify(userDetails.address) || '', // Using address if available, otherwise an empty string
        gender: userDetails.gender || '', // Using gender if available, otherwise an empty string
        provider: {
          id: userDetails.user_sso_id, // Using user_sso_id as the provider id
          name: 'digilocker', // Placeholder for provider name, as it's not present in IBasicUserDetails
        },
        walletId: walletId,
      };
      console.log('kycUserDetails', kycUserDetails);

      // Update the user's KYC data with the prepared details
      const updatedUserKycData: any = await this.httpService.axiosRef.patch(
        this.getUrl.updateUserKycUrl,
        kycUserDetails,
        {
          headers: { Authorization: callBackQueryDto.state },
        },
      );
      // Check if there's an error in the updated KYC data and throw a BadRequestException if so
      if (updatedUserKycData?.error) {
        throw new BadRequestException(userDetails.error);
      }

      // Log the updated KYC data for debugging purposes
      console.log('updatedUserKycData?.data===========', updatedUserKycData?.data);

      // Return the updated KYC data
      return updatedUserKycData?.data;
    } catch (error) {
      // Check if the error has a response with an error message and throw a new Error with that message
      if (error?.response?.data) {
        throw error?.response?.data;
      }

      // Log the error for debugging purposes
      this.logger.error('Failed to fetch userDetails', error);
      // Re-throw the error to be handled by the caller
      throw error;
    }
  }
}
