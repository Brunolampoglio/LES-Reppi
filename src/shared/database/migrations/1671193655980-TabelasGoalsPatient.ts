import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasGoalsPatient1671193655980 implements MigrationInterface {
    name = 'TabelasGoalsPatient1671193655980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doc_exams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "specialty" character varying NOT NULL, "date" character varying NOT NULL, "user_id" uuid NOT NULL, "anexo" character varying, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_841dfde98782ab9729733817820" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "goals_patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "typeofgoal" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "description" character varying NOT NULL, "points" integer NOT NULL, "status" character varying NOT NULL, "patient_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf71c4c8b0b628a03192d47cfb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doc_exams" ADD CONSTRAINT "FK_abffdf8c62eeda2582f67e17700" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "goals_patient" ADD CONSTRAINT "FK_bbdd43d853655fbc0a972b04070" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "goals_patient" DROP CONSTRAINT "FK_bbdd43d853655fbc0a972b04070"`);
        await queryRunner.query(`ALTER TABLE "doc_exams" DROP CONSTRAINT "FK_abffdf8c62eeda2582f67e17700"`);
        await queryRunner.query(`DROP TABLE "goals_patient"`);
        await queryRunner.query(`DROP TABLE "doc_exams"`);
    }

}
