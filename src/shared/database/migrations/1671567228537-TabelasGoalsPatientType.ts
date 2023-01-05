import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasGoalsPatientType1671567228537 implements MigrationInterface {
    name = 'TabelasGoalsPatientType1671567228537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "goals_patient" ADD "type" character varying NOT NULL DEFAULT 'perder'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "goals_patient" DROP COLUMN "type"`);
    }

}
