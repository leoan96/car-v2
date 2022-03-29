import { MigrationInterface, QueryRunner } from 'typeorm';

export class Snyc1648536790962 implements MigrationInterface {
  name = 'Snyc1648536790962';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_availability" DROP CONSTRAINT "FK_12e57fbad1231698916ae4a0bc4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_availability" ADD CONSTRAINT "FK_12e57fbad1231698916ae4a0bc4" FOREIGN KEY ("carListingId") REFERENCES "car_listing"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_availability" DROP CONSTRAINT "FK_12e57fbad1231698916ae4a0bc4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_availability" ADD CONSTRAINT "FK_12e57fbad1231698916ae4a0bc4" FOREIGN KEY ("carListingId") REFERENCES "car_listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
