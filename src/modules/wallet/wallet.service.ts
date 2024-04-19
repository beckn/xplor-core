import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetUrl } from '../../common/utils';
import {
  CreateWalletDto,
  GetSharedVcRequestDto,
  QueryWalletVcsDto,
  QueryWalletVcDto,
  ShareVcRequestDto,
  UpdateSharedVcStatusQuery,
  UpdateVcQueryRequestDto,
  WalletQueryDto,
  WalletVcQueryDto,
} from './dto';
import { WALLET_ERROR_MESSAGES } from '../../common/constants/error-message';

@Injectable()
export class WalletService {
  private readonly logger: Logger;

  // Constructor to inject dependencies
  constructor(private readonly httpService: HttpService, private readonly getUrl: GetUrl) {
    this.logger = new Logger(WalletService.name);
  }

  // Method to create a new wallet
  async createWallet(token: string, userId: string, createWalletDto: CreateWalletDto) {
    try {
      // Make a POST request to create a wallet
      const walletData = (
        await this.httpService.axiosRef.post(this.getUrl.getWalletUrl, { userId: userId, ...createWalletDto })
      ).data;
      const walletId = walletData?.data?._id;
      const updatedUser = await this.httpService.axiosRef.patch(
        this.getUrl.getUserProfileUrl,
        { wallet: walletId },
        { headers: { Authorization: token } },
      );
      return updatedUser?.data;
    } catch (error) {
      // Log the error and return the error response
      this.logger.error(WALLET_ERROR_MESSAGES.CREATE_WALLET, error);
      throw error?.response?.data;
    }
  }

  // Method to delete a wallet
  async deleteWallet(userId: string, walletQueryDto: WalletQueryDto) {
    try {
      // Make a DELETE request to delete a wallet
      const walletData = (
        await this.httpService.axiosRef.delete(this.getUrl.getWalletUrl, {
          params: { userId: userId, ...walletQueryDto },
        })
      ).data;
      return walletData;
    } catch (error) {
      // Log the error and return the error response
      this.logger.error(WALLET_ERROR_MESSAGES.DELETE_WALLET, error);
      throw error?.response?.data;
    }
  }

  // Method to get wallet details
  async getWalletDetails(userId: string, walletQueryDto: WalletQueryDto) {
    try {
      // Make a GET request to fetch wallet details
      const walletData = (
        await this.httpService.axiosRef.get(this.getUrl.getWalletUrl, { params: { userId: userId, ...walletQueryDto } })
      ).data;
      return walletData;
    } catch (error) {
      // Log the error and return the error response
      this.logger.error(WALLET_ERROR_MESSAGES.GET_WALLET_DETAILS, error);
      throw error?.response?.data;
    }
  }

  // Method to get wallet verifiable credentials (VCs)
  async getWalletVcs(walletVcQueryDto: WalletVcQueryDto) {
    try {
      // Make a GET request to fetch wallet VCs
      const walletData = (await this.httpService.axiosRef.get(this.getUrl.getWalletVcUrl, { params: walletVcQueryDto }))
        .data;
      return walletData;
    } catch (error) {
      // Log the error and return the error response
      this.logger.error(WALLET_ERROR_MESSAGES.GET_WALLET_VCS, error);
      throw error?.response?.data;
    }
  }
  async getWalletVc(walletVcQueryDto: QueryWalletVcDto) {
    try {
      // Make a GET request to fetch wallet VCs
      const walletData = (
        await this.httpService.axiosRef.get(this.getUrl.getWaletSingleVcUrl, { params: walletVcQueryDto })
      ).data;
      return walletData;
    } catch (error) {
      // Log the error and return the error response
      this.logger.error(WALLET_ERROR_MESSAGES.GET_WALLET_VC, error);
      throw error?.response?.data;
    }
  }
  // Method to delete wallet verifiable credentials (VC)
  async deleteWalletVc(walletVcQueryDto: QueryWalletVcsDto) {
    try {
      // Make a GET request to fetch wallet VCs
      const walletData = (
        await this.httpService.axiosRef.delete(this.getUrl.getWalletVcUrl, { params: walletVcQueryDto })
      ).data;
      return walletData;
    } catch (error) {
      // Log the error and return the error response
      this.logger.error(WALLET_ERROR_MESSAGES.DELETE_WALLET_VC, error);
      throw error?.response?.data;
    }
  }

  // Method to upload a file to the wallet
  async uploadFile(file: Express.Multer.File, body: any) {
    try {
      // Prepare the form data for file upload
      const fileBuffer = file.buffer;
      const blob = new Blob([fileBuffer], { type: file.mimetype });
      const formData = new FormData();
      formData.append('file', blob, file.originalname);
      formData.append('walletId', body.walletId);
      formData.append('category', body.category);
      const bodyTags = body.tags;
      bodyTags.map((tag: string, i: number) => {
        formData.append(`tags[${i}]`, tag);
      });

      formData.append('iconUrl', body.iconUrl);
      formData.append('name', body.name);
      // formData.append('metadata', JSON.stringify(body.metadata));

      // Make a POST request to upload the file
      const response = (
        await this.httpService.axiosRef.post(this.getUrl.getVcWalletFileUploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data;

      return response;
    } catch (error) {
      // Log the error and throw it
      this.logger.error(WALLET_ERROR_MESSAGES.UPLOAD_FILE, error);
      throw error?.response?.data;
    }
  }

  async shareVc(queryParams: QueryWalletVcsDto, body: ShareVcRequestDto) {
    try {
      // Make a POST request to share a VC
      const vcData = (await this.httpService.axiosRef.post(this.getUrl.getShareVcUrl, body, { params: queryParams }))
        .data;
      return vcData;
    } catch (error) {
      // Log the error and throw it
      this.logger.error(WALLET_ERROR_MESSAGES.SHARE_VC, error);
      throw error?.response?.data;
    }
  }
  async updateShareVc(queryParams: UpdateVcQueryRequestDto, body: ShareVcRequestDto) {
    try {
      // Make a PATCH request to share a VC
      const vcData = (
        await this.httpService.axiosRef.patch(this.getUrl.updateSharedVcUrl, body, { params: queryParams })
      ).data;
      return vcData;
    } catch (error) {
      // Log the error and throw it
      this.logger.error(WALLET_ERROR_MESSAGES.UPDATE_SHARE_VC, error);
      throw error?.response?.data;
    }
  }

  async updateShareVcStatus(queryParams: UpdateSharedVcStatusQuery) {
    try {
      // Make a PATCH request to share a VC
      const vcData = (
        await this.httpService.axiosRef.patch(this.getUrl.updateSharedVcStatusUrl, {}, { params: queryParams })
      ).data;
      return vcData;
    } catch (error) {
      // Log the error and throw it
      this.logger.error(WALLET_ERROR_MESSAGES.UPDATE_SHARE_VC_STATUS, error);
      throw error?.response?.data;
    }
  }

  async getVcSharedRequestsList(queries: GetSharedVcRequestDto) {
    try {
      // Make a GET request to fetch VC shared requests
      const vcData = (
        await this.httpService.axiosRef.get(this.getUrl.getVcSharedRequestsListUrl, {
          params: queries,
        })
      ).data;
      return vcData;
    } catch (error) {
      // Log the error and throw it
      this.logger.error(WALLET_ERROR_MESSAGES.GET_VC_SHARED_REQUESTS_LIST, error);
      throw error?.response?.data;
    }
  }
}
