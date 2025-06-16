import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import { IHealthCheckResponse } from '../../common/interfaces';
import { HealthCheckEntity } from './app.entity';
import { EAuthService } from '../e-auth/e-auth.service';
import { Public } from '../../common/decorators/public.decorators';

/**
 * AppController is responsible for handling various API endpoints related to the application.
 * It includes endpoints for health checks and handling callbacks from external services.
 */
@ApiTags('Health Checkup')
@Public()
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly eAuthService: EAuthService) {}

  /**
   * Returns a greeting message indicating the health status of the server.
   */
  @ApiResponse({
    status: 200,
    description: 'Returns a greeting message indicating the health status of the server.',
    type: HealthCheckEntity, // Assuming HealthCheck is the interface or model representing the health check data
  })
  @Get()
  getHello(): object {
    return this.appService.getHealth();
  }

  /**
   * Returns a greeting message indicating the health status of the server.
   */
  @ApiResponse({
    status: 200,
    description: 'Returns a greeting message indicating the health status of the server.',
    type: HealthCheckEntity, // Assuming HealthCheck is the interface or model representing the health check data
  })
  @Get('/health')
  getHealth(): IHealthCheckResponse {
    return this.appService.getHealth();
  }
}
