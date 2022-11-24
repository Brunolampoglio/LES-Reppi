import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelaUserPosition1669293950976 implements MigrationInterface {
    name = 'TabelaUserPosition1669293950976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "position" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position"`);
    }

}
