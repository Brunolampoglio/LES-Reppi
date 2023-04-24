import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductIdInvoice1682275395760 implements MigrationInterface {
  name = 'AddProductIdInvoice1682275395760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cardProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "last_digits" character varying NOT NULL, "first_digits" character varying NOT NULL, "brand" character varying NOT NULL, "holder_name" character varying NOT NULL, "expiration_month" integer NOT NULL, "expiration_year" integer NOT NULL, "invoice_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b48265bf953378db8cfa9dcc685" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "discount_cupons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "value" integer NOT NULL, "invoice_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eae2fc21e659c7db1c53339c2bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" ADD "product_id" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "coupon" ADD "quantity" integer`);
    await queryRunner.query(
      `ALTER TABLE "cardProducts" ADD CONSTRAINT "FK_63b5442db69c789f360bf517eff" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "discount_cupons" ADD CONSTRAINT "FK_39a6a0d3987b67002babc982f37" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "discount_cupons" DROP CONSTRAINT "FK_39a6a0d3987b67002babc982f37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cardProducts" DROP CONSTRAINT "FK_63b5442db69c789f360bf517eff"`,
    );
    await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "quantity"`);
    await queryRunner.query(
      `ALTER TABLE "invoiceProducts" DROP COLUMN "product_id"`,
    );
    await queryRunner.query(`DROP TABLE "discount_cupons"`);
    await queryRunner.query(`DROP TABLE "cardProducts"`);
  }
}
