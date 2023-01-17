import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // 这个方法会被调用
  async validate(username: string, password: string): Promise<any> {
    // console.log('111')
    const user = await this.authService.validateUser(username, password)
    // console.log('222', user)
    if(!user){
      throw new UnauthorizedException()
    }
    return user
  }

}
