import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1681156616728 implements MigrationInterface {
  name = 'CreateTables1681156616728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cartProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "image_url" character varying NOT NULL, "value" integer NOT NULL, "quantity" integer NOT NULL, "cart_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4fa8e863802b26a14315e3b0bf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "total" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "last_digits" character varying NOT NULL, "first_digits" character varying NOT NULL, "brand" character varying NOT NULL, "holder_name" character varying NOT NULL, "expiration_month" integer NOT NULL, "expiration_year" integer NOT NULL, "main" boolean, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "birth_date" character varying, "gender" character varying NOT NULL, "phone" character varying NOT NULL, "type_phone" character varying NOT NULL, "status" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "cart_id" uuid NOT NULL, "order_number" character varying NOT NULL, "discount" integer NOT NULL, "status" character varying NOT NULL, "freight" integer NOT NULL, "total" integer NOT NULL, "address_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id_address" uuid NOT NULL DEFAULT uuid_generate_v4(), "zip" character varying NOT NULL, "street" character varying NOT NULL, "street_type" character varying NOT NULL, "neighborhood" character varying NOT NULL, "country" character varying NOT NULL, "is_default" boolean NOT NULL, "uf" character varying, "city" character varying NOT NULL, "number" character varying NOT NULL, "obs" character varying NOT NULL, "type_residence" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8294a7da240377a44a4ce476047" PRIMARY KEY ("id_address"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coupon" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "value" integer NOT NULL, "active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "flags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ea7e333c92a55de9e9b8d0b9afd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "category" character varying NOT NULL, "image_url" character varying NOT NULL, "language" character varying NOT NULL, "bar_code" character varying NOT NULL, "year" character varying NOT NULL, "pages_quantity" integer NOT NULL, "isbn" character varying NOT NULL, "value" integer NOT NULL, "publishing_company" character varying NOT NULL, "edition" character varying NOT NULL, "dimensions" character varying NOT NULL, "weight_in_grams" integer NOT NULL, "synopsis" character varying NOT NULL, "stock_units" integer NOT NULL, "is_available" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cartProducts" ADD CONSTRAINT "FK_78dff5aab4ddfa7ded964e77e21" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_00ec72ad98922117bad8a86f980" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_26daf5e433d6fb88ee32ce93637" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_06b988008172177cad789fe0ded" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_5eefabfff026406ae9f423657ee" FOREIGN KEY ("address_id") REFERENCES "address"("id_address") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_5eefabfff026406ae9f423657ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_06b988008172177cad789fe0ded"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_26daf5e433d6fb88ee32ce93637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_00ec72ad98922117bad8a86f980"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cartProducts" DROP CONSTRAINT "FK_78dff5aab4ddfa7ded964e77e21"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "flags"`);
    await queryRunner.query(`DROP TABLE "coupon"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "invoices"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(`DROP TABLE "cartProducts"`);
  }
}
