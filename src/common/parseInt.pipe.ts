import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10) // 去除小数部分
    if (isNaN(val)){
      throw new BadRequestException('Validation failed')
    }
    return val
  }
}
