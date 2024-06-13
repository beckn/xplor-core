import { Body, Controller, Delete, Get, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { WalletService } from './wallet.service';
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
import { ExtractUserId } from '../../common/decorators/extract-userId';
import { ExtractToken } from '../../common/decorators/extract-token.decorator';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // Endpoint to upload a file to the wallet
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileToWallet(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.walletService.uploadFile(file, body);
  }

  // Endpoint to get wallet verifiable credentials (VCs)
  @Get('vcs')
  getWalletVcs(@Query() walletVcQueryDto: WalletVcQueryDto) {
    return this.walletService.getWalletVcs(walletVcQueryDto);
  }

  // Endpoint to get wallet verifiable credentials (VCs)
  @Get('vc')
  getWalletVc(@Query() walletVcQueryDto: QueryWalletVcDto) {
    return this.walletService.getWalletVc(walletVcQueryDto);
  }

  // Endpoint to get wallet verifiable credentials (VCs)
  @Delete('vc')
  deleteWalletVcs(@Query() walletVcQueryDto: QueryWalletVcsDto) {
    return this.walletService.deleteWalletVc(walletVcQueryDto);
  }

  // Endpoint to get wallet verifiable credentials (VCs)
  @Get('vc/shared/requests')
  async getShareRequests(@Query() queries: GetSharedVcRequestDto) {
    return await this.walletService.getVcSharedRequestsList(queries);
  }

  // Endpoint to udpate wallet verifiable credentials share recored(VCs)
  @Patch('vc/shared/requests/update')
  async updateShareVc(@Query() queryParams: UpdateVcQueryRequestDto, @Body() body: ShareVcRequestDto) {
    return await this.walletService.updateShareVc(queryParams, body);
  }

  @Patch('vc/shared/requests/status')
  async updateShareVcStatus(@Query() queryParams: UpdateSharedVcStatusQuery) {
    return await this.walletService.updateShareVcStatus(queryParams);
  }

  // Endpoint to share wallet verifiable credentials (VCs)
  @Put('vc/share')
  async shareVc(@Query() queryParams: QueryWalletVcsDto, @Body() body: ShareVcRequestDto) {
    return await this.walletService.shareVc(queryParams, body);
  }

  // Endpoint to get wallet details
  @Get()
  getWallet(@ExtractUserId() userId: string, @Query() walletQueryDto: WalletQueryDto) {
    return this.walletService.getWalletDetails(userId, walletQueryDto);
  }

  // Endpoint to create a new wallet
  @Post()
  createWallet(
    @ExtractToken() token: string,
    @ExtractUserId() userId: string,
    @Body() createWalletDto: CreateWalletDto,
  ) {
    return this.walletService.createWallet(token, userId, createWalletDto);
  }

  // Endpoint to delete a wallet
  @Delete()
  deleteWallet(@ExtractUserId() userId: string, @Query() walletQueryDto: WalletQueryDto) {
    return this.walletService.deleteWallet(userId, walletQueryDto);
  }
}
