import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRecordToNumber1708608333820 implements MigrationInterface {
  name = 'UpdateRecordToNumber1708608333820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "history" DROP COLUMN "record"
        `);
    await queryRunner.query(`
            ALTER TABLE "history"
            ADD "record" integer NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "history" DROP COLUMN "record"
        `);
    await queryRunner.query(`
            ALTER TABLE "history"
            ADD "record" character varying NOT NULL
        `);
  }
}
