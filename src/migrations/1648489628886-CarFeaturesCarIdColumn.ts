import { MigrationInterface, QueryRunner } from 'typeorm';

export class CarFeaturesCarIdColumn1648489628886 implements MigrationInterface {
  name = 'CarFeaturesCarIdColumn1648489628886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "car_features" ADD "carId" integer`);
    await queryRunner.query(
      `ALTER TABLE "car_features" ADD CONSTRAINT "FK_9ba05cb66b6bb70f7665c0996b5" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_features" DROP CONSTRAINT "FK_9ba05cb66b6bb70f7665c0996b5"`,
    );
    await queryRunner.query(`ALTER TABLE "car_features" DROP COLUMN "carId"`);
  }
}
