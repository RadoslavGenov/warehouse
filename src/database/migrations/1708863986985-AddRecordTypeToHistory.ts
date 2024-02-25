import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecordTypeToHistory1708863986985 implements MigrationInterface {
  name = 'AddRecordTypeToHistory1708863986985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "history"
            ADD "type" integer NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "history" DROP COLUMN "type"
        `);
  }
}
