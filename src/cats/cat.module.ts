import { Module } from '@nestjs/common'
import { CatsService } from "./cats.service";
import { CatsController } from "./cats.controller";
import { CustomerService } from "../customer/customer.service";

@Module({
  controllers: [ CatsController ],
  providers: [ CatsService, CustomerService ],
  exports: [ CatsService ]
})

export class CatModule {}
