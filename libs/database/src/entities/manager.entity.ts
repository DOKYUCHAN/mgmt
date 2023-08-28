import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

import { ManagerSchema } from '@app/schemas';
import { MgmtItem } from '.';

@Entity({ name: 'Manager' })
@Unique('unique_manager_01', ['mgmt_item_id', 'email', 'deleted_at'])
export class Manager implements ManagerSchema {
  @PrimaryGeneratedColumn('uuid', { comment: '담당자 UUID' })
  manager_id: string;

  @ManyToOne(
    () => MgmtItem,
    (mgmtItem) => {
      mgmtItem.mgmt_item_id;
    },
  )
  @JoinColumn({ name: 'mgmt_item_id' })
  @Column({ type: 'uuid', comment: '관리항목 UUID' })
  mgmt_item_id: string;

  @Column({ comment: '성명', type: 'varchar', length: 50 })
  name: string;

  @Column({ comment: 'email', type: 'varchar', length: 100 })
  email: string;

  @CreateDateColumn({ comment: '생성 일시', type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ comment: '수정 일시', type: 'timestamp with time zone' })
  updated_at: Date;

  @DeleteDateColumn({ comment: '삭제 일시', type: 'timestamp with time zone' })
  deleted_at: Date;
}
