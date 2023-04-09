import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInvoice1681060613401 implements MigrationInterface {
    name = 'CreateInvoice1681060613401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP CONSTRAINT "FK_55eacde447998e4f9a1c3815624"`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "cart_id" character varying NOT NULL, "order_number" character varying NOT NULL, "discount" integer NOT NULL, "status" character varying NOT NULL, "freight" integer NOT NULL, "total" integer NOT NULL, "address_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP COLUMN "createdAtId"`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD "product_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP COLUMN "cart_id"`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD "cart_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_5eefabfff026406ae9f423657ee" FOREIGN KEY ("address_id") REFERENCES "address"("id_address") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD CONSTRAINT "FK_78dff5aab4ddfa7ded964e77e21" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP CONSTRAINT "FK_78dff5aab4ddfa7ded964e77e21"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_5eefabfff026406ae9f423657ee"`);
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP COLUMN "cart_id"`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD "cart_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD "createdAtId" uuid`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD CONSTRAINT "FK_55eacde447998e4f9a1c3815624" FOREIGN KEY ("createdAtId") REFERENCES "cartProducts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
