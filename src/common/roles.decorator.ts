// 这个是自定义的装饰器类注解
import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: string[]) => SetMetadata('roles', roles)
