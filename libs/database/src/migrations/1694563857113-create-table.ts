import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1694563857113 implements MigrationInterface {
  name = 'CreateTable1694563857113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Dept" ("dept_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dept_nm" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_83243844e60be340b200049f08c" PRIMARY KEY ("dept_id")); COMMENT ON COLUMN "Dept"."dept_id" IS '부서 UUID'; COMMENT ON COLUMN "Dept"."dept_nm" IS '부서명'; COMMENT ON COLUMN "Dept"."created_at" IS '생성 일시'; COMMENT ON COLUMN "Dept"."updated_at" IS '수정 일시'; COMMENT ON COLUMN "Dept"."deleted_at" IS '삭제 일시'`,
    );
    await queryRunner.query(
      `CREATE TABLE "Team" ("team_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "team_nm" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "dept_id" uuid, CONSTRAINT "PK_f8ae33aeb1b677ac9f22d9bf60a" PRIMARY KEY ("team_id")); COMMENT ON COLUMN "Team"."team_id" IS '팀 UUID'; COMMENT ON COLUMN "Team"."team_nm" IS '팀명'; COMMENT ON COLUMN "Team"."created_at" IS '생성 일시'; COMMENT ON COLUMN "Team"."updated_at" IS '수정 일시'; COMMENT ON COLUMN "Team"."deleted_at" IS '삭제 일시'; COMMENT ON COLUMN "Team"."dept_id" IS '부서 UUID'`,
    );
    await queryRunner.query(
      `CREATE TABLE "MgmtType" ("mgmt_type_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mgmt_type_nm" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_6c0b101b624c0a48b23d09be089" PRIMARY KEY ("mgmt_type_id")); COMMENT ON COLUMN "MgmtType"."mgmt_type_id" IS '관리유형 UUID'; COMMENT ON COLUMN "MgmtType"."mgmt_type_nm" IS '관리유형명'; COMMENT ON COLUMN "MgmtType"."created_at" IS '생성 일시'; COMMENT ON COLUMN "MgmtType"."updated_at" IS '수정 일시'; COMMENT ON COLUMN "MgmtType"."deleted_at" IS '삭제 일시'`,
    );
    await queryRunner.query(
      `CREATE TABLE "MgmtItem" ("mgmt_item_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "partner" character varying(50) NOT NULL, "mgmt_item_nm" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "team_id" uuid NOT NULL, "mgmt_type_id" uuid NOT NULL, CONSTRAINT "PK_efc0bcbbe2cd15d24bf1399ab3c" PRIMARY KEY ("mgmt_item_id")); COMMENT ON COLUMN "MgmtItem"."mgmt_item_id" IS '관리항목 UUID'; COMMENT ON COLUMN "MgmtItem"."partner" IS '고객사'; COMMENT ON COLUMN "MgmtItem"."mgmt_item_nm" IS '관리항목명'; COMMENT ON COLUMN "MgmtItem"."created_at" IS '생성 일시'; COMMENT ON COLUMN "MgmtItem"."updated_at" IS '수정 일시'; COMMENT ON COLUMN "MgmtItem"."deleted_at" IS '삭제 일시'; COMMENT ON COLUMN "MgmtItem"."team_id" IS '팀 UUID'; COMMENT ON COLUMN "MgmtItem"."mgmt_type_id" IS '관리유형 UUID'`,
    );
    await queryRunner.query(
      `CREATE TABLE "Manager" ("manager_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "mgmt_item_id" uuid NOT NULL, CONSTRAINT "PK_09d7ee8ca2df0e872a62b37f0b8" PRIMARY KEY ("manager_id")); COMMENT ON COLUMN "Manager"."manager_id" IS '담당자 UUID'; COMMENT ON COLUMN "Manager"."name" IS '성명'; COMMENT ON COLUMN "Manager"."email" IS 'email'; COMMENT ON COLUMN "Manager"."created_at" IS '생성 일시'; COMMENT ON COLUMN "Manager"."updated_at" IS '수정 일시'; COMMENT ON COLUMN "Manager"."deleted_at" IS '삭제 일시'; COMMENT ON COLUMN "Manager"."mgmt_item_id" IS '관리항목 UUID'`,
    );
    await queryRunner.query(
      `ALTER TABLE "Team" ADD CONSTRAINT "FK_9a3ed00e33702a33be0eee06a08" FOREIGN KEY ("dept_id") REFERENCES "Dept"("dept_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "MgmtItem" ADD CONSTRAINT "FK_fba0f7cc08fb7e90a869e329fdf" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "MgmtItem" ADD CONSTRAINT "FK_59716d091dc4b276926e387c0ed" FOREIGN KEY ("mgmt_type_id") REFERENCES "MgmtType"("mgmt_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Manager" ADD CONSTRAINT "FK_8422725325ace336504dad8e7a0" FOREIGN KEY ("mgmt_item_id") REFERENCES "MgmtItem"("mgmt_item_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Manager" DROP CONSTRAINT "FK_8422725325ace336504dad8e7a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "MgmtItem" DROP CONSTRAINT "FK_59716d091dc4b276926e387c0ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "MgmtItem" DROP CONSTRAINT "FK_fba0f7cc08fb7e90a869e329fdf"`,
    );
    await queryRunner.query(`ALTER TABLE "Team" DROP CONSTRAINT "FK_9a3ed00e33702a33be0eee06a08"`);
    await queryRunner.query(`DROP TABLE "Manager"`);
    await queryRunner.query(`DROP TABLE "MgmtItem"`);
    await queryRunner.query(`DROP TABLE "MgmtType"`);
    await queryRunner.query(`DROP TABLE "Team"`);
    await queryRunner.query(`DROP TABLE "Dept"`);
  }
}
