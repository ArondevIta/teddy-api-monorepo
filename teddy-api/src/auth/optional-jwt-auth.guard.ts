import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Always return true, making the guard optional
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // If there's an error or no user, just return null instead of throwing
    // This allows the route to continue without authentication
    if (err || !user) {
      return null;
    }
    return user;
  }
}
