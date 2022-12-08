import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelaPatientData1670252904923 implements MigrationInterface {
    name = 'TabelaPatientData1670252904923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "colesterol" character varying NOT NULL, "creatinina" character varying NOT NULL, "hemoglobina_glicada" character varying NOT NULL, "peso" character varying NOT NULL, "descricao" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_319849fbd8f10c26b6d2df652da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "hour" character varying NOT NULL, "day" character varying NOT NULL, "month" character varying NOT NULL, "client_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patient_data" ADD CONSTRAINT "FK_ff92e2e0edec0a4091f0d3b80e0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_29edd1f24c2f173c6273ffa1344" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_29edd1f24c2f173c6273ffa1344"`);
        await queryRunner.query(`ALTER TABLE "patient_data" DROP CONSTRAINT "FK_ff92e2e0edec0a4091f0d3b80e0"`);
        await queryRunner.query(`DROP TABLE "exams"`);
        await queryRunner.query(`DROP TABLE "patient_data"`);
    }

}
