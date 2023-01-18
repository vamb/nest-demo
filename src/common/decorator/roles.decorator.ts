// 这个是自定义的装饰器类注解
import { SetMetadata } from "@nestjs/common";
import { RoleEnums } from "../enum/role.enums";

export const ROLE_KEY = 'roles'
export const Roles = (...roles: RoleEnums[]) => SetMetadata(ROLE_KEY, roles)
