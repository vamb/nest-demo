import { Injectable } from '@nestjs/common'
import { CreateCatDto } from "./dto/create-cat.dto";


@Injectable()
export class CatsService {

  create(createCatDto: CreateCatDto) {
    return createCatDto
  }

  findAll() {
    return `This action returns all cats`;
  }

  findOne(id: string) {
    return {
      id: id,
      name: 'catName1',
      age: 1,
      category: 'catName2'
    }
  }

  update(id: number) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`
  }
}
