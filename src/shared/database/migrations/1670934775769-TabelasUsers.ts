import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasUsers1670934775769 implements MigrationInterface {
    name = 'TabelasUsers1670934775769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "physical_activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "series" character varying NOT NULL, "repetitions" character varying NOT NULL, "type" character varying NOT NULL, "client_id" uuid NOT NULL, CONSTRAINT "PK_b7d654536be3a9a8471b8021ccf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patientMenu" ADD "typeofmeal" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gestor_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gestor_id" uuid`);
        await queryRunner.query(`ALTER TABLE "physical_activity" ADD CONSTRAINT "FK_89c39d71c7eed5d6bc7f4caae55" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3a20f533abbb811b019c524b1eb" FOREIGN KEY ("gestor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3a20f533abbb811b019c524b1eb"`);
        await queryRunner.query(`ALTER TABLE "physical_activity" DROP CONSTRAINT "FK_89c39d71c7eed5d6bc7f4caae55"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gestor_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gestor_id" character varying`);
        await queryRunner.query(`ALTER TABLE "patientMenu" DROP COLUMN "typeofmeal"`);
        await queryRunner.query(`DROP TABLE "physical_activity"`);
    }

}
