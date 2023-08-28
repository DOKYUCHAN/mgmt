import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { MgmtTypeSchema } from '@app/schemas';

@Entity({ name: 'MgmtType' })
export class MgmtType implements MgmtTypeSchema {
  @PrimaryGeneratedColumn('uuid', { comment: '관리유형 UUID' })
  mgmt_type_id: string;

  @Column({ comment: '관리유형명', type: 'varchar', length: 50 })
  mgmt_type_nm: string;

  @CreateDateColumn({ comment: '생성 일시', type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ comment: '수정 일시', type: 'timestamp with time zone' })
  updated_at: Date;

  @DeleteDateColumn({ comment: '삭제 일시', type: 'timestamp with time zone' })
  deleted_at: Date;
}
