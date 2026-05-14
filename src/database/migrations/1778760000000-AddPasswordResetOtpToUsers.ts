import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordResetOtpToUsers1778760000000
  implements MigrationInterface
{
  name = 'AddPasswordResetOtpToUsers1778760000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password_reset_otp_hash" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password_reset_otp_expires_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "password_reset_otp_expires_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "password_reset_otp_hash"`,
    );
  }
}
