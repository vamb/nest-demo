import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { CatModule } from "./cats/cat.module";
import { LoggerMiddleware } from "./common/logger.middleware";

@Module({
  imports: [CustomerModule, CatModule],
  controllers: [AppController],
  providers: [AppService],
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
