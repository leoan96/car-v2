import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeCarEntities1648401559561 implements MigrationInterface {
  name = 'InitializeCarEntities1648401559561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "car_features" ("id" SERIAL NOT NULL, "feature" character varying(30) NOT NULL, CONSTRAINT "UQ_dbc551b6b771b46ce67f41f2cfd" UNIQUE ("feature"), CONSTRAINT "PK_3170f28e047ca7806f4be877c45" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car" ("id" SERIAL NOT NULL, "brand" character varying(30) NOT NULL, "model" character varying(30) NOT NULL, "description" character varying array NOT NULL, "images" character varying array NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car_time_slot" ("id" SERIAL NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "slots" boolean array NOT NULL, "carAvailabilityId" integer, CONSTRAINT "PK_12c1e2f82ba09e0b24e7cc62ec6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car_availability" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "carListingId" integer, CONSTRAINT "PK_85a37f0d6b4238591b513752a49" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car_listing" ("id" SERIAL NOT NULL, "location" character varying(150) NOT NULL, "lat" real NOT NULL, "lng" real NOT NULL, "currency" character varying(3) NOT NULL, "price" integer NOT NULL, "cummulative_ratings" integer NOT NULL, "total_number_of_ratings" integer NOT NULL, "average_rating" real NOT NULL, "total_request_bookings" integer NOT NULL, "total_acceptance" integer NOT NULL, "response_rate_in_percentage" real NOT NULL, "response_time_in_minutes" integer NOT NULL, "is_booked" boolean NOT NULL, "is_locked" boolean NOT NULL, "is_available_for_view_in_car_listing" boolean NOT NULL, CONSTRAINT "PK_1002accb75e625ec98eeb441136" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_time_slot" ADD CONSTRAINT "FK_21b639f07e74c9699f4925888a3" FOREIGN KEY ("carAvailabilityId") REFERENCES "car_availability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_availability" ADD CONSTRAINT "FK_12e57fbad1231698916ae4a0bc4" FOREIGN KEY ("carListingId") REFERENCES "car_listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_availability" DROP CONSTRAINT "FK_12e57fbad1231698916ae4a0bc4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_time_slot" DROP CONSTRAINT "FK_21b639f07e74c9699f4925888a3"`,
    );
    await queryRunner.query(`DROP TABLE "car_listing"`);
    await queryRunner.query(`DROP TABLE "car_availability"`);
    await queryRunner.query(`DROP TABLE "car_time_slot"`);
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TABLE "car_features"`);
  }
}
