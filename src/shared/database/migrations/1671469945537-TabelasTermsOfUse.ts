import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasTermsOfUse1671469945537 implements MigrationInterface {
    name = 'TabelasTermsOfUse1671469945537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "terms_of_use" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876c6c2717bea0d112b5a863cc1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "terms_of_use"`);
    }

}
