import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class DatabaseConfig {
  @Expose()
  @IsNotEmpty()
  public DB_HOST!: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  public DB_PORT!: number;

  @Expose()
  @IsNotEmpty()
  public DB_USERNAME!: string;

  @Expose()
  @IsNotEmpty()
  public DB_PASSWORD!: string;

  @Expose()
  @IsNotEmpty()
  public DB_DATABASE!: string;

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  public DB_MAX_POOL_SIZE?: number;
}
