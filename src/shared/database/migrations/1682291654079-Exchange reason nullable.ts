import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExchangeReasonNullable1682291654079 implements MigrationInterface {
  name = 'ExchangeReasonNullable1682291654079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" ADD "exchange_reason" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" DROP COLUMN "exchange_reason"`,
    );
  }
}
