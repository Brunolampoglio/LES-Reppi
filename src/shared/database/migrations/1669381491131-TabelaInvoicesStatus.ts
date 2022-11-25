import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelaInvoicesStatus1669381491131 implements MigrationInterface {
    name = 'TabelaInvoicesStatus1669381491131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" ADD "status" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" boolean DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ADD "health_insurance" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "health_insurance"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "status"`);
    }

}
