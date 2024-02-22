import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAmountPerProduct1708592694592 implements MigrationInterface {
  name = 'AddAmountPerProduct1708592694592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD "amount" integer NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "amount"
        `);
  }
}
