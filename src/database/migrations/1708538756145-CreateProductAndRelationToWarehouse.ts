import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateroductAndRelationToWarehouse1708538756145
  implements MigrationInterface
{
  name = 'CreateProductAndRelationToWarehouse1708538756145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "product" (
                "id" SERIAL NOT NULL,
                "isHazardous" boolean NOT NULL,
                "warehouseId" integer,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_433aa43cf849c1a614d0e939fe1" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "product"
        `);
  }
}
