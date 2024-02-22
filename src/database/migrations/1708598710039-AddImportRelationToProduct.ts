import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImportRelationToProduct1708598710039
  implements MigrationInterface
{
  name = 'AddImportRelationToProduct1708598710039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "import" (
                "id" SERIAL NOT NULL,
                "amount" integer NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "productId" integer,
                CONSTRAINT "PK_4ed733f5bcc70cec27187bd90eb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "import"
            ADD CONSTRAINT "FK_37c487b8970ea88b784ae0089d5" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "import" DROP CONSTRAINT "FK_37c487b8970ea88b784ae0089d5"
        `);
    await queryRunner.query(`
            DROP TABLE "import"
        `);
  }
}
