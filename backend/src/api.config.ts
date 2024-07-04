import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { ArrayNotEmpty } from 'class-validator';

export class ApiConfig {
  @Expose()
  @ToCommaSeparatedArray()
  @ArrayNotEmpty()
  WHITELIST_ORIGINS!: string[];
}

function ToCommaSeparatedArray(): PropertyDecorator {
  return Transform(({ value }: TransformFnParams) => {
    if (!value) {
      return [];
    }
    return value.toString().split(',');
  });
}
