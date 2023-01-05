import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableAddress1666722846099 implements MigrationInterface {
  name = 'TableAddress1666722846099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id_address" uuid NOT NULL DEFAULT uuid_generate_v4(), "zip" character varying NOT NULL, "street" character varying NOT NULL, "state" character varying, "neighborhood" character varying, "city" character varying NOT NULL, "district" character varying NOT NULL, "number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8294a7da240377a44a4ce476047" PRIMARY KEY ("id_address"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone_number" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "address_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_1b05689f6b6456680d538c3d2ea" UNIQUE ("address_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "address"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_1b05689f6b6456680d538c3d2ea"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address_id"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_number"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
