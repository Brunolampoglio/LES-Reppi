import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasAwards1671454085205 implements MigrationInterface {
    name = 'TabelasAwards1671454085205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "awards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "points" integer NOT NULL, "client_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bc3f6adc548ff46c76c03e06377" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "awards" ADD CONSTRAINT "FK_c991a1b46f93f5bf2a65d0f6a1e" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "awards" DROP CONSTRAINT "FK_c991a1b46f93f5bf2a65d0f6a1e"`);
        await queryRunner.query(`DROP TABLE "awards"`);
    }

}
