import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate( context: ExecutionContext ) {
    // console.log('RolesGuard context', context)
    const roles = this.reflector.get<string []>('roles', context.getHandler())
    if (!roles) {
      throw new UnauthorizedException()
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return this.matchRoles(roles, user.role)
  }

  private matchRoles(): boolean{
    return true
  }
}
