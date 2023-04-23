import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableInvoiceProducts1682267127784
  implements MigrationInterface
{
  name = 'AlterTableInvoiceProducts1682267127784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" DROP COLUMN "product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" DROP CONSTRAINT "FK_11b454a996ee3c8efbc382c16c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" ALTER COLUMN "invoice_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" ADD CONSTRAINT "FK_11b454a996ee3c8efbc382c16c0" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" DROP CONSTRAINT "FK_11b454a996ee3c8efbc382c16c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" ALTER COLUMN "invoice_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" ADD CONSTRAINT "FK_11b454a996ee3c8efbc382c16c0" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" ADD "product_id" character varying NOT NULL`,
    );
  }
}
