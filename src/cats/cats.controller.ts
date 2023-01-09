import { Controller, Get, Post, HttpCode, Body, Query,
    HttpStatus, Header, Param, Res, Req } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto'
import { CatsService } from "./cats.service";

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

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
        response.status(HttpStatus.OK).send(
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
    findOne(@Param('id') id: string, @Res() resp){
        const rest = this.catsService.findOne(id)
        resp.status(HttpStatus.OK).send(
          { data: rest }
        )
    }

    @Post('create')
    @Header('Cache-Control', 'none')
    create(@Body() createCatDto: CreateCatDto, @Res() resp) {
        resp.status(HttpStatus.OK).send(
          { data: createCatDto }
        )
    }
}
