import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelaAddressComplement1669398753214 implements MigrationInterface {
    name = 'TabelaAddressComplement1669398753214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "complement" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "complement"`);
    }

}
