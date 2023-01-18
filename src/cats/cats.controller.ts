import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  SetMetadata,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto'
import { CatsService } from "./cats.service";
import { CustomerService } from "../customer/customer.service";
import { ValidationPipe } from "../common/pipe/validation.pipe";
import { ParseIntPipe } from '../common/pipe/parseInt.pipe'
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../common/decorator/roles.decorator";
// import { RolesGuard } from "../common/role.guard";
import { LoggingInterceptor } from "../common/interceptor/logging.interceptor";
import { TimeoutInterceptor } from "../common/interceptor/timeout.interceptor";
import { RoleEnums } from "../common/enum/role.enums";
import { RolesGuard } from "../common/guard/role.guard";

@Controller('cats')
// @UseGuards(RolesGuard) //这个是controller级别的Guard调用
@UseGuards(JwtAuthGuard)
@UseInterceptors(TimeoutInterceptor)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly customerService: CustomerService,
) {}

  @Get('testCustomerRole')
  // @Roles('admin') // 这个还没学到（fundamentals），目前在（overview - Guards），后面再说
  @SetMetadata('roles', ['admin'])
  testCustomerRole(){
    return {
      msg: 'testCustomerRole return',
      statusCode: HttpStatus.NO_CONTENT
    }
  }

  @Get('getException')
  getException() {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN, {
      // cause: 'sdsdfsdf'
    })
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  all() {
    return {
      msg: 'This action returns all cats',
      statusCode: HttpStatus.NO_CONTENT
    }
  }

  @Get('findAll')
  findAll(@Res() response, @Req() request, @Query() query, @Body() body) {
    // response.status(HttpStatus.OK).send(
    //   {
    //     requestBody: request.body,
    //     body: body,
    //     requestQuery: request.query,
    //     query: query,
    //     data: [{name: 'test1'},{name: 'test2'},{name: 'test3'}]
    //   }
    // )
    response.status(HttpStatus.OK).json(
      {
        requestBody: request.body,
        body: body,
        requestQuery: request.query,
        query: query,
        data: [{name: 'test1'},{name: 'test2'},{name: 'test3'}]
      }
    )
  }

  @Get('find/:id')
  // findOne(@Param('id', ParseIntPipe) id: number, @Res() resp){
  findOne(@Param('id', new ParseIntPipe()) id, @Res() resp){
  // findOne(@Param('id') id, @Res() resp){
    console.log('findOne method called at controller')
    const rest = this.catsService.findOne(id)
    const customer = this.customerService.findOne(+id)
    resp.status(HttpStatus.OK).send(
      {
        data: {
          catObj: rest,
          customerObj: customer
        }
      }
    )
  }

  // 单独为某个方法指定入参验证
  // @nestjs/common 有自己的ValidationPipe()，效果差不多，也挺好用的
  @Post('create')
  @Header('Cache-Control', 'none')
  @Roles(RoleEnums.Admin)
  @UseGuards(RolesGuard)
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto)
  }
}
