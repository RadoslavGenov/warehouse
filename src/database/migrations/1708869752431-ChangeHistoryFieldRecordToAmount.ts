import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeHistoryFieldRecordToAmount1708869752431
  implements MigrationInterface
{
  name = 'ChangeHistoryFieldRecordToAmount1708869752431';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "history"
                RENAME COLUMN "record" TO "amount"
        `);
    await queryRunner.query(`
            ALTER TABLE "import" DROP COLUMN "type"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "import"
            ADD "type" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "history"
                RENAME COLUMN "amount" TO "record"
        `);
  }
}
