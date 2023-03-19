import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelaCards1679233778557 implements MigrationInterface {
    name = 'TabelaCards1679233778557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "last_digits" character varying NOT NULL, "first_digits" character varying NOT NULL, "brand" character varying NOT NULL, "holder_name" character varying NOT NULL, "expiration_month" integer NOT NULL, "expiration_year" integer NOT NULL, "main" boolean, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_00ec72ad98922117bad8a86f980" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_00ec72ad98922117bad8a86f980"`);
        await queryRunner.query(`DROP TABLE "card"`);
    }

}
