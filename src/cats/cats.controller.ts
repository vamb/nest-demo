import { Controller, Get, Post, HttpCode, HttpStatus, Header, Param } from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Get('all')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return {
            msg: 'This action returns all cats',
            statusCode: HttpStatus.NO_CONTENT
        }
    }

    @Get('find/:id')
    findOne(@Param('id') id: string){
        return {
            msg: `This action returns one cats: ${id}`,
            statusCode: HttpStatus.NO_CONTENT
        }
    }

    @Post('create')
    // @HttpCode(HttpStatus.NO_CONTENT)
    @Header('Cache-Control', 'none')
    create() {
        return {
            msg: 'This action adds a new cat',
            statusCode: HttpStatus.NO_CONTENT
        }
    }
}
