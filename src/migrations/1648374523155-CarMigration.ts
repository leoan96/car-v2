import { MigrationInterface, QueryRunner } from 'typeorm';

export class CarMigration1648374523155 implements MigrationInterface {
  name = 'CarMigration1648374523155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "testMigration"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car" ADD "testMigration" character varying NOT NULL`,
    );
  }
}
