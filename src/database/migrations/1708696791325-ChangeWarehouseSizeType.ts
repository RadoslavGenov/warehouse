import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeWarehouseSizeType1708696791325
  implements MigrationInterface
{
  name = 'ChangeWarehouseSizeType1708696791325';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "warehouse" DROP COLUMN "size"
        `);
    await queryRunner.query(`
            ALTER TABLE "warehouse"
            ADD "size" integer NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "warehouse" DROP COLUMN "size"
        `);
    await queryRunner.query(`
            ALTER TABLE "warehouse"
            ADD "size" character varying NOT NULL
        `);
  }
}
