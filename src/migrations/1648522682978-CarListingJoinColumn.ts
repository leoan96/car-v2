import { MigrationInterface, QueryRunner } from 'typeorm';

export class CarListingJoinColumn1648522682978 implements MigrationInterface {
  name = 'CarListingJoinColumn1648522682978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_listing" ADD "carId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ADD CONSTRAINT "UQ_42c9018a051649ead54e6a5ea85" UNIQUE ("carId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" ADD CONSTRAINT "FK_42c9018a051649ead54e6a5ea85" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_listing" DROP CONSTRAINT "FK_42c9018a051649ead54e6a5ea85"`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_listing" DROP CONSTRAINT "UQ_42c9018a051649ead54e6a5ea85"`,
    );
    await queryRunner.query(`ALTER TABLE "car_listing" DROP COLUMN "carId"`);
  }
}
