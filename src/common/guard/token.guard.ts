// Import necessary decorators and classes from NestJS and other libraries.
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'; // Utility to reflect metadata.

import { UserService } from '../../modules/user/user.service'; // Service to interact with user-related data.
import { IS_PUBLIC_KEY } from '../decorators/public.decorators'; // Custom decorator to mark routes as public.
import { ERROR_MESSAGES } from '../constants/error-message'; // Constants for error messages.

// Decorate the class with @Injectable() to make it a provider that can be injected into other parts of the application.
@Injectable()
export class TokenGuard implements CanActivate {
  // Constructor to inject dependencies.
  constructor(private readonly userService: UserService, private reflector: Reflector) {}

  // Implement the canActivate method required by the CanActivate interface.
  // This method is called automatically by NestJS to determine if the current request should be handled by the route handler.
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> | any {
    // Check if the route is marked as public using the Reflector. If so, allow unauthenticated access.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // Check the handler (route handler method).
      context.getClass(), // Check the controller class.
    ]);
    if (isPublic) {
      return true; // Allow access.
    }

    // Extract the request object from the execution context.
    const request = context.switchToHttp().getRequest();
    // Extract the token from the Authorization header.
    const token = request.headers.authorization?.split(' ')[1];

    // If there's no token, throw an UnauthorizedException.
    if (!token) {
      throw new BadRequestException(ERROR_MESSAGES.TOKEN_MISSING);
    }

    // Validate the token using the UserService.
    // This assumes that the UserService has a method named validateToken that takes a token and returns a boolean or Promise<boolean> indicating if the token is valid.
    return this.userService.validateToken(token);
  }
}
