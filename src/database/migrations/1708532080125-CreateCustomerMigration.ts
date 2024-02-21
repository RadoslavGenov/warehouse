import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerMigration1708532080125
  implements MigrationInterface
{
  name = 'CreateCustomerMigration1708532080125';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "customer" (
                "id" SERIAL NOT NULL,
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "customer"
        `);
  }
}
