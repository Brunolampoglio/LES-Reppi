import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelaPlanPriceFloat1669294817887 implements MigrationInterface {
    name = 'TabelaPlanPriceFloat1669294817887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "plans" ADD "price" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "plans" ADD "price" integer NOT NULL`);
    }

}
