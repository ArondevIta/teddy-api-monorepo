import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

/**
 * Common Swagger response decorators to avoid polluting controllers
 */

// Standard Success Responses
export const ApiSuccessResponse = (dto?: any, description?: string) =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: description || 'Success',
      type: dto,
    }),
  );

export const ApiCreatedResponse = (dto?: any, description?: string) =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.CREATED,
      description: description || 'Resource created successfully',
      type: dto,
    }),
  );

export const ApiNoContentResponse = (description?: string) =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: description || 'Operation completed successfully',
    }),
  );

// Standard Error Responses
export const ApiBadRequestResponse = (description?: string) =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: description || 'Bad Request - Invalid input data',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { 
            oneOf: [
              { type: 'string' },
              { type: 'array', items: { type: 'string' } }
            ],
            example: 'Validation failed'
          },
          error: { type: 'string', example: 'Bad Request' },
        },
      },
    }),
  );

export const ApiUnauthorizedResponse = (description?: string) =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: description || 'Unauthorized - Invalid or missing authentication',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Unauthorized' },
        },
      },
    }),
  );

export const ApiForbiddenResponse = (description?: string) =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: description || 'Forbidden - Insufficient permissions',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 403 },
          message: { type: 'string', example: 'Forbidden resource' },
        },
      },
    }),
  );

export const ApiNotFoundResponse = (description?: string) =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: description || 'Resource not found',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'Resource not found' },
        },
      },
    }),
  );

export const ApiConflictResponse = (description?: string) =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: description || 'Conflict - Resource already exists',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 409 },
          message: { type: 'string', example: 'Resource already exists' },
        },
      },
    }),
  );

export const ApiInternalServerErrorResponse = (description?: string) =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: description || 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 500 },
          message: { type: 'string', example: 'Internal server error' },
        },
      },
    }),
  );

// Composite decorators for common scenarios
export const ApiStandardResponses = () =>
  applyDecorators(
    ApiBadRequestResponse(),
    ApiUnauthorizedResponse(),
    ApiInternalServerErrorResponse(),
  );

export const ApiAuthenticatedResponses = () =>
  applyDecorators(
    ApiBadRequestResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiInternalServerErrorResponse(),
  );

export const ApiCrudResponses = () =>
  applyDecorators(
    ApiBadRequestResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiNotFoundResponse(),
    ApiInternalServerErrorResponse(),
  );

// Specific use-case decorators
export const ApiUserResponses = () =>
  applyDecorators(
    ApiCrudResponses(),
  );

export const ApiUrlShortenerResponses = () =>
  applyDecorators(
    ApiCrudResponses(),
    ApiConflictResponse('URL already shortened by this user'),
  );

export const ApiRedirectResponses = () =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.FOUND,
      description: 'Redirect to original URL',
    }),
    ApiNotFoundResponse('Short code not found'),
    ApiInternalServerErrorResponse(),
  );
