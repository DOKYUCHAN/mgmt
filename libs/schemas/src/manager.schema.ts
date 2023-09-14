import { MgmtItem } from '@app/database';

export interface ManagerSchema {
  manager_id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  // 📌 Relational Variables
  mgmtItem: MgmtItem;
}
