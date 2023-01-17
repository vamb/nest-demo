import { Module, NestModule, MiddlewareConsumer, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { CatModule } from "./cats/cat.module";
import { LoggerMiddleware } from "./common/logger.middleware";
import { APP_PIPE } from '@nestjs/core'
// import { ValidationPipe } from "./common/validation.pipe";
import { ParseIntPipe } from './common/parseInt.pipe'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
