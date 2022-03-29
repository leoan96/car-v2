import { MigrationInterface, QueryRunner } from 'typeorm';

export class Reset1648490804977 implements MigrationInterface {
  name = 'Reset1648490804977';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }
}
