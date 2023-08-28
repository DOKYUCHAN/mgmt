import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { DeptSchema } from '@app/schemas';

@Entity({ name: 'Dept' })
export class Dept implements DeptSchema {
  @PrimaryGeneratedColumn('uuid', { comment: '부서 UUID' })
  dept_id: string;

  @Column({ comment: '부서명', type: 'varchar', length: 50 })
  dept_nm: string;

  @CreateDateColumn({ comment: '생성 일시', type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ comment: '수정 일시', type: 'timestamp with time zone' })
  updated_at: Date;

  @DeleteDateColumn({ comment: '삭제 일시', type: 'timestamp with time zone' })
  deleted_at: Date;
}
