import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasDocExamsCreatedAt1672924469979 implements MigrationInterface {
    name = 'TabelasDocExamsCreatedAt1672924469979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doc_exams" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doc_exams" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doc_exams" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "doc_exams" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

}
