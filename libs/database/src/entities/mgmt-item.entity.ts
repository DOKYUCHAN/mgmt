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

import { MgmtItemSchema } from '@app/schemas';

import { Team, MgmtType } from '.';

@Entity({ name: 'MgmtItem' })
export class MgmtItem implements MgmtItemSchema {
  @PrimaryGeneratedColumn('uuid', { comment: '관리항목 UUID' })
  mgmt_item_id: string;

  @Column({ comment: '고객사', type: 'varchar', length: 50 })
  partner: string;

  @Column({ comment: '관리항목명', type: 'varchar', length: 50 })
  mgmt_item_nm: string;

  @CreateDateColumn({ comment: '생성 일시', type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ comment: '수정 일시', type: 'timestamp with time zone' })
  updated_at: Date;

  @DeleteDateColumn({ comment: '삭제 일시', type: 'timestamp with time zone' })
  deleted_at: Date;

  // 📌 Relational Variables
  @ManyToOne(
    () => Team,
    (team) => {
      team.team_id;
    },
    { nullable: false },
  )
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(
    () => MgmtType,
    (mgmtType) => {
      mgmtType.mgmt_type_id;
    },
    { nullable: false },
  )
  @JoinColumn({ name: 'mgmt_type_id' })
  mgmtType: MgmtType;
}
