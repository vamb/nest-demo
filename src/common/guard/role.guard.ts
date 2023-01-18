import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "../decorator/roles.decorator";
import { RoleEnums } from "../enum/role.enums";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate( context: ExecutionContext ): boolean {
    // console.log('RolesGuard context', context)
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnums[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('requiredRoles', requiredRoles)
    if (!requiredRoles ) {
      return true;
    }
    const { body } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => body.roles?.includes(role));
  }
}
