import { Module, NestModule, MiddlewareConsumer, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { CatModule } from "./cats/cat.module";
import { LoggerMiddleware } from "./common/logger.middleware";
import { APP_PIPE, APP_GUARD } from '@nestjs/core'
// import { ValidationPipe } from "./common/validation.pipe";
import { ParseIntPipe } from './common/parseInt.pipe'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesGuard } from "./common/role.guard";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Module({
  imports: [CustomerModule, CatModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe // 这里可以定义全局的入参验证方法
    },
    // {
    //   provide: APP_PIPE,
    //   useClass: ParseIntPipe // 全局定义多个
    // },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // 这个是定义全局的guard, (Interesting, 这里居然啥都可以定义)
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard, // 这样就把所有的controller都包成jwt比验证的模式, 不过login方法也会check JWT导致用户无法登录
    // },
    AppService
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware)
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      // .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
      // .forRoutes(CatsController);
      // .exclude(
      //   { path: 'cats', method: RequestMethod.GET },
      //   { path: 'cats', method: RequestMethod.POST },
      //   'cats/(.*)',
      // )
      .forRoutes('cats')
  }
}
