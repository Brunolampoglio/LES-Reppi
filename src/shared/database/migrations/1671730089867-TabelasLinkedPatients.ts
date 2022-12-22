import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelasLinkedPatients1671730089867 implements MigrationInterface {
    name = 'TabelasLinkedPatients1671730089867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "linked_patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patient_id" uuid NOT NULL, "gestor_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7b27717021b7069aa1fbf8727c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "linked_patients" ADD CONSTRAINT "FK_7a3125c53d281b9e8e69c280363" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "linked_patients" ADD CONSTRAINT "FK_0cc3a39b5d204c9666b000419b7" FOREIGN KEY ("gestor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linked_patients" DROP CONSTRAINT "FK_0cc3a39b5d204c9666b000419b7"`);
        await queryRunner.query(`ALTER TABLE "linked_patients" DROP CONSTRAINT "FK_7a3125c53d281b9e8e69c280363"`);
        await queryRunner.query(`DROP TABLE "linked_patients"`);
    }

}
