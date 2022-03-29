import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEntities1648521744060 implements MigrationInterface {
  name = 'InitEntities1648521744060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "car_availability" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_85a37f0d6b4238591b513752a49" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car" ("id" SERIAL NOT NULL, "brand" character varying(30) NOT NULL, "model" character varying(30) NOT NULL, "description" character varying array NOT NULL, "images" character varying array NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car_features" ("id" SERIAL NOT NULL, "feature" character varying(30) NOT NULL, CONSTRAINT "UQ_dbc551b6b771b46ce67f41f2cfd" UNIQUE ("feature"), CONSTRAINT "PK_3170f28e047ca7806f4be877c45" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car_listing" ("id" SERIAL NOT NULL, "location" character varying(150) NOT NULL, "lat" real NOT NULL, "lng" real NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'MYR', "price" integer NOT NULL, "cummulative_ratings" integer NOT NULL DEFAULT '0', "total_number_of_ratings" integer NOT NULL DEFAULT '0', "average_rating" real NOT NULL DEFAULT '0', "total_request_bookings" integer NOT NULL DEFAULT '0', "total_acceptance" integer NOT NULL DEFAULT '0', "response_rate_in_percentage" real NOT NULL DEFAULT '0', "response_time_in_minutes" integer NOT NULL DEFAULT '0', "is_booked" boolean NOT NULL DEFAULT false, "is_locked" boolean NOT NULL DEFAULT false, "is_available_for_view_in_car_listing" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_1002accb75e625ec98eeb441136" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car_features_car_features" ("carId" integer NOT NULL, "carFeaturesId" integer NOT NULL, CONSTRAINT "PK_ff1c2e179036c4efa704b85c9d1" PRIMARY KEY ("carId", "carFeaturesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c0849b9885789c02c4c1464f52" ON "car_features_car_features" ("carId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5feabf35d953006988fcaf816a" ON "car_features_car_features" ("carFeaturesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "car_features_car_features" ADD CONSTRAINT "FK_c0849b9885789c02c4c1464f523" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_features_car_features" ADD CONSTRAINT "FK_5feabf35d953006988fcaf816aa" FOREIGN KEY ("carFeaturesId") REFERENCES "car_features"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_features_car_features" DROP CONSTRAINT "FK_5feabf35d953006988fcaf816aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_features_car_features" DROP CONSTRAINT "FK_c0849b9885789c02c4c1464f523"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5feabf35d953006988fcaf816a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c0849b9885789c02c4c1464f52"`,
    );
    await queryRunner.query(`DROP TABLE "car_features_car_features"`);
    await queryRunner.query(`DROP TABLE "car_listing"`);
    await queryRunner.query(`DROP TABLE "car_features"`);
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TABLE "car_availability"`);
  }
}
