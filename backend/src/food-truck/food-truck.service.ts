import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodTruck } from './food-truck.entity';
import { FoodTruckConfig } from './food-truck.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FoodTruckService {
  private readonly sfGovFoodTruckListUrl: string;

  constructor(
    @InjectRepository(FoodTruck)
    private foodTruckRepository: Repository<FoodTruck>,
    private readonly configService: ConfigService<FoodTruckConfig>,
  ) {
    this.sfGovFoodTruckListUrl = this.configService.getOrThrow(
      'SF_GOV_FOOD_TRUCKS_LIST_URL',
    );
  }

  findAll(): Promise<FoodTruck[]> {
    return this.foodTruckRepository.find();
  }
}
