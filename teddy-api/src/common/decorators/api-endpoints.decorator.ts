import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  ApiSuccessResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiUserResponses,
  ApiUrlShortenerResponses,
  ApiRedirectResponses,
} from './swagger-responses.decorator';
import { UserResponseDto } from '../../users/dto/user.dto';
import { UrlResponseDto } from '../../url-shortener/dto/shorten-url.dto';

/**
 * Endpoint-specific decorators that combine operation info with responses
 * This keeps controllers clean while providing comprehensive API documentation
 */

// User Endpoints
export const ApiGetUserProfile = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get current user profile',
      description: "Retrieve the authenticated user's profile information",
    }),
    ApiSuccessResponse(UserResponseDto, 'User profile retrieved successfully'),
    ApiUserResponses()
  );

export const ApiUpdateUserProfile = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update user profile',
      description: "Update the authenticated user's profile information",
    }),
    ApiSuccessResponse(UserResponseDto, 'User profile updated successfully'),
    ApiUserResponses()
  );

export const ApiDeleteUserAccount = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete user account',
      description:
        'Permanently delete the user account. This action cannot be undone.',
    }),
    ApiNoContentResponse('User account deleted successfully'),
    ApiUserResponses()
  );

export const ApiCreateUser = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Create new user account',
      description: 'Register a new user account with email and password',
    }),
    ApiCreatedResponse(UserResponseDto, 'User account created successfully'),
    ApiUserResponses()
  );

export const ApiLoginUser = () =>
  applyDecorators(
    ApiOperation({
      summary: 'User login',
      description: 'Authenticate user and receive JWT access token',
    }),
    ApiSuccessResponse(undefined, 'Login successful, JWT token returned'),
    ApiUserResponses()
  );

// URL Shortener Endpoints
export const ApiShortenUrl = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Shorten URL',
      description:
        'Create a shortened version of a long URL. Works for both authenticated and anonymous users.',
    }),
    ApiCreatedResponse(UrlResponseDto, 'URL shortened successfully'),
    ApiUrlShortenerResponses()
  );

export const ApiUpdateShortenedUrl = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update shortened URL',
      description:
        'Update the original URL of an existing shortened URL. Only the owner can update.',
    }),
    ApiSuccessResponse(UrlResponseDto, 'Shortened URL updated successfully'),
    ApiUrlShortenerResponses()
  );

export const ApiDeleteShortenedUrl = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete shortened URL',
      description: 'Delete a shortened URL. Only the owner can delete.',
    }),
    ApiNoContentResponse('Shortened URL deleted successfully'),
    ApiUrlShortenerResponses()
  );

export const ApiRedirectToOriginalUrl = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Redirect to original URL',
      description:
        'Redirect to the original URL using the short code. Increments click counter.',
    }),
    ApiRedirectResponses()
  );

export const ApiGetUserUrls = () =>
  applyDecorators(
    ApiOperation({
      summary: "Get user's shortened URLs",
      description:
        'Retrieve all shortened URLs created by the authenticated user',
    }),
    ApiSuccessResponse([UrlResponseDto], 'User URLs retrieved successfully'),
    ApiUrlShortenerResponses()
  );
