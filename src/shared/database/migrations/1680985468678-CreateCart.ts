import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCart1680985468678 implements MigrationInterface {
    name = 'CreateCart1680985468678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cartProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "image_url" character varying NOT NULL, "value" integer NOT NULL, "quantity" integer NOT NULL, "cart_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "createdAtId" uuid, CONSTRAINT "PK_4fa8e863802b26a14315e3b0bf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "total" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cartProducts" ADD CONSTRAINT "FK_55eacde447998e4f9a1c3815624" FOREIGN KEY ("createdAtId") REFERENCES "cartProducts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cartProducts" DROP CONSTRAINT "FK_55eacde447998e4f9a1c3815624"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "cartProducts"`);
    }

}
