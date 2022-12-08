import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasExams1670507605635 implements MigrationInterface {
    name = 'TabelasExams1670507605635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patientMenu" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dayofweek" character varying NOT NULL, "hour" character varying NOT NULL, "description" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_248cc73b893d5faa9a009f25343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exams" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patientMenu" ADD CONSTRAINT "FK_a278d02906f284705ceba8e465b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patientMenu" DROP CONSTRAINT "FK_a278d02906f284705ceba8e465b"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TABLE "patientMenu"`);
    }

}
