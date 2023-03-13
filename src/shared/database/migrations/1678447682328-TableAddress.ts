import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableAddress1678447682328 implements MigrationInterface {
  name = 'TableAddress1678447682328';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP COLUMN "typeResidence"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "street_type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "neighborhood" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "country" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "is_default" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "type_residence" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "birth_date" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "birth_date" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP COLUMN "type_residence"`,
    );
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "is_default"`);
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "neighborhood"`);
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "street_type"`);
    await queryRunner.query(
      `ALTER TABLE "address" ADD "typeResidence" character varying NOT NULL`,
    );
  }
}
