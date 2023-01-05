import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasExamsPatientId1672768882295 implements MigrationInterface {
    name = 'TabelasExamsPatientId1672768882295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exams" ADD "patient_id" uuid`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_ba3e7dab5385c4fa1f8149a51fb" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_ba3e7dab5385c4fa1f8149a51fb"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "patient_id"`);
    }

}
