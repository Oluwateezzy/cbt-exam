import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'
import { Role } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector){}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role == userRole)
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    const logger = new Logger()
    logger.log(roles)
    if (!roles) return true;
    const request = context.switchToHttp().getRequest()
    const user = request.user;
    return this.matchRoles(roles, user.role)
  }
}
