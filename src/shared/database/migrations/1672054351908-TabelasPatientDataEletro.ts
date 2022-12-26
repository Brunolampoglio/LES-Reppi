import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasPatientDataEletro1672054351908 implements MigrationInterface {
    name = 'TabelasPatientDataEletro1672054351908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_data" ADD "eletrocardiograma" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_data" DROP COLUMN "eletrocardiograma"`);
    }

}
