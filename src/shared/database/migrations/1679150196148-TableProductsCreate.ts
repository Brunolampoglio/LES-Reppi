import {MigrationInterface, QueryRunner} from "typeorm";

export class TableProductsCreate1679150196148 implements MigrationInterface {
    name = 'TableProductsCreate1679150196148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "category" character varying NOT NULL, "image_url" character varying NOT NULL, "language" character varying NOT NULL, "bar_code" character varying NOT NULL, "year" character varying NOT NULL, "pages_quantity" integer NOT NULL, "isbn" character varying NOT NULL, "value" integer NOT NULL, "publishing_company" character varying NOT NULL, "edition" character varying NOT NULL, "dimensions" character varying NOT NULL, "weight_in_grams" integer NOT NULL, "synopsis" character varying NOT NULL, "stock_units" integer NOT NULL, "is_available" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
