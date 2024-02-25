import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductNameFieldToHistory1708870298234
  implements MigrationInterface
{
  name = 'AddProductNameFieldToHistory1708870298234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "history"
            ADD "productName" character varying NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "history" DROP COLUMN "productName"
        `);
  }
}
