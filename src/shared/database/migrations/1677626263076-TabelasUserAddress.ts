import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasUserAddress1677626263076 implements MigrationInterface {
    name = 'TabelasUserAddress1677626263076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "phone" character varying NOT NULL, "status" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id_address" uuid NOT NULL DEFAULT uuid_generate_v4(), "zip" character varying NOT NULL, "street" character varying NOT NULL, "uf" character varying, "city" character varying NOT NULL, "number" character varying NOT NULL, "obs" character varying NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8294a7da240377a44a4ce476047" PRIMARY KEY ("id_address"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
