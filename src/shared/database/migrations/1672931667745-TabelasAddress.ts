import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasAddress1672931667745 implements MigrationInterface {
    name = 'TabelasAddress1672931667745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "neighborhood"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "uf" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "uf"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "neighborhood" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "district" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying`);
    }

}
