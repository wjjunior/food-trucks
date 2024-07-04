import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintToLocationId1720063897144
  implements MigrationInterface
{
  name = 'AddUniqueConstraintToLocationId1720063897144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "food_truck" ADD CONSTRAINT "UQ_82f59ae8f0d9c22c1f2417c9c6a" UNIQUE ("location_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "food_truck" DROP CONSTRAINT "UQ_82f59ae8f0d9c22c1f2417c9c6a"`,
    );
  }
}
