import { MigrationInterface, QueryRunner } from 'typeorm';

export class WarehouseRelationToCustomer1708538513638
  implements MigrationInterface
{
  name = 'WarehouseRelationToCustomer1708538513638';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "warehouse" (
                "id" SERIAL NOT NULL,
                "size" character varying NOT NULL,
                "customerId" integer,
                CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "warehouse"
            ADD CONSTRAINT "FK_b63c771a9b6b178fd3afb9d1d1f" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "warehouse" DROP CONSTRAINT "FK_b63c771a9b6b178fd3afb9d1d1f"
        `);
    await queryRunner.query(`
            DROP TABLE "warehouse"
        `);
  }
}
