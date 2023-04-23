import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvoiceProduct1681769091181 implements MigrationInterface {
  name = 'InvoiceProduct1681769091181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_06b988008172177cad789fe0ded"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_5eefabfff026406ae9f423657ee"`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoiceProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "image_url" character varying NOT NULL, "value" integer NOT NULL, "exchange_status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "invoice_id" uuid, CONSTRAINT "PK_52e3f56921f56f1dc68a66cbba9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "cart_id"`);
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" ADD CONSTRAINT "FK_11b454a996ee3c8efbc382c16c0" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_5eefabfff026406ae9f423657ee" FOREIGN KEY ("address_id") REFERENCES "address"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_5eefabfff026406ae9f423657ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" DROP CONSTRAINT "FK_11b454a996ee3c8efbc382c16c0"`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "cart_id"`);
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "cart_id" uuid NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "invoiceProducts"`);
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_5eefabfff026406ae9f423657ee" FOREIGN KEY ("address_id") REFERENCES "address"("id_address") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_06b988008172177cad789fe0ded" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
