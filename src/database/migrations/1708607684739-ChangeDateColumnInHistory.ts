import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDateColumnInHistory1708607684739
  implements MigrationInterface
{
  name = 'ChangeDateColumnInHistory1708607684739';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "history"
                RENAME COLUMN "createdAt" TO "date"
        `);
    await queryRunner.query(`
            ALTER TABLE "history"
            ALTER COLUMN "date" DROP DEFAULT
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "history"
            ALTER COLUMN "date"
            SET DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "history"
                RENAME COLUMN "date" TO "createdAt"
        `);
  }
}
