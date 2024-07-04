import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import fetch from 'node-fetch';
import * as csv from 'csv-parser';
import { FoodTruck } from './food-truck.entity';
import { FoodTruckConfig } from './food-truck.config';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class FoodTruckService {
  private readonly sfGovFoodTruckListUrl: string;

  constructor(
    @InjectRepository(FoodTruck)
    private foodTruckRepository: Repository<FoodTruck>,
    private readonly configService: ConfigService<FoodTruckConfig>,
    private readonly dataSource: DataSource,
  ) {
    this.sfGovFoodTruckListUrl = this.configService.getOrThrow(
      'SF_GOV_FOOD_TRUCKS_LIST_URL',
    );
  }

  findAll(): Promise<FoodTruck[]> {
    return this.foodTruckRepository.find();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateFoodTrucks(): Promise<void> {
    const foodTrucks = await this.fetchCsv();
    const locationIds = foodTrucks.map((ft) => ft.locationId);

    // Start a database transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Delete removed food trucks
    await this.deleteRemovedFoodTrucks(queryRunner.manager, locationIds);

    // Parse CSV from S3 stream and batch insert
    try {
      await this.processFoodTrucks(foodTrucks, queryRunner.manager);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Error processing CSV: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  private async fetchCsv(): Promise<FoodTruck[]> {
    const response = await fetch(this.sfGovFoodTruckListUrl);
    const foodTrucks: FoodTruck[] = [];

    return new Promise((resolve, reject) => {
      response.body
        .pipe(csv())
        .on('data', (data) => {
          const foodTruck = new FoodTruck();
          foodTruck.name = data.Applicant;
          foodTruck.description = data.FoodItems;
          foodTruck.latitude = data.Latitude;
          foodTruck.longitude = data.Longitude;
          foodTruck.locationId = Number(data.locationid);
          foodTrucks.push(foodTruck);
        })
        .on('end', () => resolve(foodTrucks))
        .on('error', (error) => reject(error));
    });
  }

  private async processFoodTrucks(
    foodTrucks: FoodTruck[],
    entityManager: EntityManager,
    batchSize = 500,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const batch: FoodTruck[] = [];

      try {
        for (const foodTruckData of foodTrucks) {
          batch.push(foodTruckData);

          if (batch.length >= batchSize) {
            await this.upsertFoodTrucks(batch, entityManager);
            batch.length = 0;
          }
        }

        // Process any remaining food trucks in the batch
        if (batch.length > 0) {
          await this.upsertFoodTrucks(batch, entityManager);
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private async upsertFoodTrucks(
    foodTrucks: FoodTruck[],
    entityManager: EntityManager,
  ): Promise<void> {
    await entityManager
      .createQueryBuilder()
      .insert()
      .into(FoodTruck)
      .values(foodTrucks)
      .onConflict(
        `("location_id") DO UPDATE SET 
        "name" = excluded."name",
        "description" = excluded."description",
        "latitude" = excluded."latitude",
        "longitude" = excluded."longitude"`,
      )
      .execute();
  }

  private async deleteRemovedFoodTrucks(
    entityManager: EntityManager,
    locationIds: number[],
  ): Promise<void> {
    await entityManager
      .createQueryBuilder()
      .delete()
      .from(FoodTruck)
      .where('locationId NOT IN (:...locationIds)', { locationIds })
      .execute();
  }
}
