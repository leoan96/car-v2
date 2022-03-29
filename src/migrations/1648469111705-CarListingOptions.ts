import { MigrationInterface, QueryRunner } from 'typeorm';

export class CarListingOptions1648469111705 implements MigrationInterface {
  name = 'CarListingOptions1648469111705';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "currency" SET DEFAULT 'MYR'`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "cummulative_ratings" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "total_number_of_ratings" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "average_rating" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "total_request_bookings" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "total_acceptance" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "response_rate_in_percentage" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "response_time_in_minutes" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "is_booked" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "is_locked" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "is_available_for_view_in_car_listing" SET DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "is_available_for_view_in_car_listing" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "is_locked" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "is_booked" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "response_time_in_minutes" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "response_rate_in_percentage" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "total_acceptance" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "total_request_bookings" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "average_rating" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "total_number_of_ratings" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "cummulative_ratings" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ALTER COLUMN "currency" DROP DEFAULT`,
    );
  }
}
