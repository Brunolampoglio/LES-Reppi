import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasCertificate1670962584746 implements MigrationInterface {
    name = 'TabelasCertificate1670962584746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certificates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" character varying NOT NULL, "user_id" uuid NOT NULL, "anexo" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4c7e31e2144300bea7d89eb165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "certificates" ADD CONSTRAINT "FK_88f90b1b9c635c14271e509cec0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certificates" DROP CONSTRAINT "FK_88f90b1b9c635c14271e509cec0"`);
        await queryRunner.query(`DROP TABLE "certificates"`);
    }

}
