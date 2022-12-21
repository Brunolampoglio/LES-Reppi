import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasLicenseofUse1671644356655 implements MigrationInterface {
    name = 'TabelasLicenseofUse1671644356655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "solicitation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL DEFAULT 'pendente', "awards_id" uuid NOT NULL, "patient_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_00a04c95007d83fd505e3a199e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "license_of_use" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee33c032da64f71a42242c2dd5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "solicitation" ADD CONSTRAINT "FK_2b5fe9072f5f7a6926f8ba8780f" FOREIGN KEY ("awards_id") REFERENCES "awards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solicitation" ADD CONSTRAINT "FK_d5263e6aef4e10a6d51e0570b7c" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitation" DROP CONSTRAINT "FK_d5263e6aef4e10a6d51e0570b7c"`);
        await queryRunner.query(`ALTER TABLE "solicitation" DROP CONSTRAINT "FK_2b5fe9072f5f7a6926f8ba8780f"`);
        await queryRunner.query(`DROP TABLE "license_of_use"`);
        await queryRunner.query(`DROP TABLE "solicitation"`);
    }

}
