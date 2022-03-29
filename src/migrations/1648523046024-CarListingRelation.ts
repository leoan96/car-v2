import { MigrationInterface, QueryRunner } from 'typeorm';

export class CarListingRelation1648523046024 implements MigrationInterface {
  name = 'CarListingRelation1648523046024';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_availability" ADD "carListingId" integer`,
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
      `ALTER TABLE "car_availability" DROP COLUMN "carListingId"`,
    );
  }
}
