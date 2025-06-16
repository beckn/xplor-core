/**
 * Represents the structure of a provider object, including details like code, iconLink, title, subTitle, and redirectUrl.
 */
export interface IProvider {
  /**
   * The code of the provider.
   */
  code: string;

  /**
   * The link to the provider icon.
   */
  iconLink: string;

  /**
   * The title of the provider.
   */
  title: string;

  /**
   * The subtitle of the provider.
   */
  subTitle: string;

  /**
   * The redirect URL of the provider.
   */
  redirectUrl: string;
}

/**
 * Represents the structure of a health check response object, typically used for reporting the health status of a microservice.
 */
export interface IHealthCheck {
  /**
   * The status of the health check.
   */
  status: string;

  /**
   * The version of the server.
   */
  version: string;

  /**
   * A message indicating the server status.
   */
  serverMessage: string;
}
