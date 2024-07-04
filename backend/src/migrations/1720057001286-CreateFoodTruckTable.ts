import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFoodTruckTable1720057001286 implements MigrationInterface {
  name = 'CreateFoodTruckTable1720057001286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "food_truck" (
        "id" SERIAL NOT NULL, 
        "name" character varying NOT NULL, 
        "description" character varying NOT NULL, 
        "latitude" character varying NOT NULL, 
        "longitude" character varying NOT NULL, 
        "location_id" integer NOT NULL, 
        CONSTRAINT "PK_8917af8771e61204840bcf45917" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "food_truck"`);
  }
}
