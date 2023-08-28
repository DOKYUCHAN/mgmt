import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import { TeamSchema } from '@app/schemas';
import { Dept } from '.';

@Entity({ name: 'Team' })
export class Team implements TeamSchema {
  @PrimaryGeneratedColumn('uuid', { comment: '팀 UUID' })
  team_id: string;

  @ManyToOne(
    () => Dept,
    (dept) => {
      dept.dept_id;
    },
  )
  @JoinColumn({ name: 'dept_id' })
  @Column({ type: 'uuid', comment: '부서 UUID' })
  dept_id: string;

  @Column({ comment: '팀명', type: 'varchar', length: 50 })
  team_nm: string;

  @CreateDateColumn({ comment: '생성 일시', type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ comment: '수정 일시', type: 'timestamp with time zone' })
  updated_at: Date;

  @DeleteDateColumn({ comment: '삭제 일시', type: 'timestamp with time zone' })
  deleted_at: Date;
}
