import { Controller, Get, Post, HttpCode, Body, Query,
    HttpStatus, Header, Param, Res, Req, HttpException,
  ForbiddenException, UseGuards,
  // ParseIntPipe,
  UsePipes } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto'
import { CatsService } from "./cats.service";
import { CustomerService } from "../customer/customer.service";
import { JoiValidationPipe } from "../common/JoiValidation.pipe";
import { ValidationPipe } from "../common/validation.pipe";
import { ParseIntPipe } from '../common/parseInt.pipe'
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('cats')
export class CatsController {
    constructor(
      private readonly catsService: CatsService,
      private readonly customerService: CustomerService,
  ) {}

    @Get('getException')
    getException() {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        // cause: 'sdsdfsdf'
      })
    }

    @UseGuards(JwtAuthGuard)
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
    async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
      return this.catsService.create(createCatDto)
    }
}
