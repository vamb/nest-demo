import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from "./common/guard/role.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new RolesGuard()) //这个是比较粗暴的全局定义方法，另外一种是在app.module里面定义
  await app.listen(3000);
}
bootstrap();
