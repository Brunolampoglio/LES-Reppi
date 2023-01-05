import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasMyPoints1671473722106 implements MigrationInterface {
    name = 'TabelasMyPoints1671473722106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mypoints" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "points" integer NOT NULL DEFAULT '0', "user_id" uuid NOT NULL, CONSTRAINT "PK_9468c984b602a5edcc3198ae733" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mypoints" ADD CONSTRAINT "FK_1d0c6dfcc5031971fa00fcef36b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mypoints" DROP CONSTRAINT "FK_1d0c6dfcc5031971fa00fcef36b"`);
        await queryRunner.query(`DROP TABLE "mypoints"`);
    }

}
