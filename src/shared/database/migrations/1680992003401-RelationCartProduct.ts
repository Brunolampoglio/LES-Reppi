import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationCartProduct1680992003401 implements MigrationInterface {
    name = 'RelationCartProduct1680992003401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP CONSTRAINT "FK_78dff5aab4ddfa7ded964e77e21"`);
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP COLUMN "cart_id"`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD "cart_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD CONSTRAINT "FK_4fa8e863802b26a14315e3b0bf6" FOREIGN KEY ("id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP CONSTRAINT "FK_4fa8e863802b26a14315e3b0bf6"`);
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP COLUMN "cart_id"`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD "cart_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD CONSTRAINT "FK_78dff5aab4ddfa7ded964e77e21" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
