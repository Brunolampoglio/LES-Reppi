import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelaCupons1679243563854 implements MigrationInterface {
    name = 'TabelaCupons1679243563854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cupon" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "value" integer NOT NULL, "active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_08423b49f3520f83ee9c3e9cb1e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cupon"`);
    }

}
