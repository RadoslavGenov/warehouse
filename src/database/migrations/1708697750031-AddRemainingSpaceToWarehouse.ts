import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRemainingSpaceToWarehouse1708697750031
  implements MigrationInterface
{
  name = 'AddRemainingSpaceToWarehouse1708697750031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "warehouse"
            ADD "remainingSpace" integer NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "warehouse" DROP COLUMN "remainingSpace"
        `);
  }
}
