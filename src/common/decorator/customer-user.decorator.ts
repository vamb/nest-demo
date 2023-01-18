import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CustomerUser = createParamDecorator(
  ((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user =  request.body
    user.age = user?.age + 1
    return data? user?.[data]: user
  })
)
