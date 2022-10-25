import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableUser1666718284983 implements MigrationInterface {
  name = 'TableUser1666718284983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plans" ADD "user_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD "cpf" character varying`);
    await queryRunner.query(
      `ALTER TABLE "plans" ADD CONSTRAINT "FK_32f8c25a5ce0e33674e1253411e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plans" DROP CONSTRAINT "FK_32f8c25a5ce0e33674e1253411e"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
    await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "user_id"`);
  }
}
