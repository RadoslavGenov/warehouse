import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHistoryEntity1708542562390 implements MigrationInterface {
  name = 'CreateHistoryEntity1708542562390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "history" (
                "id" SERIAL NOT NULL,
                "record" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "history"
        `);
  }
}
