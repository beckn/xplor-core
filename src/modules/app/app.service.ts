import { Injectable } from '@nestjs/common';

import { IHealthCheckResponse } from '../../common/interfaces';

/**
 * AppService provides the core functionalities of the application.
 * It includes methods for health checks and other core functionalities.
 */
@Injectable()
export class AppService {
  /**
   * Returns the health status of the application.
   */
  getHealth(): IHealthCheckResponse {
    return { status: 'ok', message: 'core server is up and running' };
  }
}
