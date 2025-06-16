// Import necessary decorators and classes from NestJS and Express.
import { ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

import { GlobalExceptionFilter } from '../filters/global-exception.filter';

// Define a test suite for the GlobalExceptionFilter.
describe('GlobalExceptionFilter', () => {
  // Declare variables to hold the filter instance, mock host, and mock response.
  let filter: GlobalExceptionFilter;
  let mockHost: ArgumentsHost;
  let mockResponse: Response;

  // Setup before each test case.
  beforeEach(() => {
    // Initialize the GlobalExceptionFilter instance.
    filter = new GlobalExceptionFilter();
    // Mock the response object to simulate an Express response.
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Mock the status method to return the mock response itself.
      json: jest.fn(), // Mock the json method.
    } as any;
    // Mock the host object to simulate an NestJS ArgumentsHost.
    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse, // Mock the getResponse method to return the mock response.
        getRequest: () => ({}), // Mock the getRequest method to return an empty object.
      }),
    } as any;
  });

  // Test case to ensure the filter handles AxiosError correctly.
  it('should handle AxiosError', () => {
    // Create a mock AxiosError.
    const axiosError = new Error('Axios request failed') as any;
    axiosError.isAxiosError = true;
    axiosError.response = {
      status: 404,
      data: {
        message: 'Resource not found',
      },
    };
    // Call the catch method of the filter with the mock AxiosError and mock host.
    filter.catch(axiosError, mockHost);

    // Assert that the status method of the mock response was called with 500.
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });

  // Test case to ensure the filter handles HttpException correctly.
  it('should handle HttpException', () => {
    // Create a mock HttpException.
    const httpException = new HttpException('Forbidden', 403);
    // Call the catch method of the filter with the mock HttpException and mock host.
    filter.catch(httpException, mockHost);

    // Assert that the status method of the mock response was called with 403.
    expect(mockResponse.status).toHaveBeenCalledWith(403);
  });

  // Test case to ensure the filter handles unknown exceptions correctly.
  it('should handle unknown exceptions', () => {
    // Create a mock Error.
    const unknownException = new Error('Internal server error');
    // Call the catch method of the filter with the mock Error and mock host.
    filter.catch(unknownException, mockHost);

    // Assert that the status method of the mock response was called with 500.
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
