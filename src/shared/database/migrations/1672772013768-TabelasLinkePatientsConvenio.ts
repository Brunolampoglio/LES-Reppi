import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasLinkePatientsConvenio1672772013768 implements MigrationInterface {
    name = 'TabelasLinkePatientsConvenio1672772013768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "health_insurance"`);
        await queryRunner.query(`ALTER TABLE "linked_patients" ADD "health_insurance" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linked_patients" DROP COLUMN "health_insurance"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "health_insurance" character varying`);
    }

}
