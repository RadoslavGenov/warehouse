import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHazardousFieldToWarehouse1708592028582
  implements MigrationInterface
{
  name = 'AddHazardousFieldToWarehouse1708592028582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "warehouse"
            ADD "isHazardous" boolean NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "warehouse" DROP COLUMN "isHazardous"
        `);
  }
}
