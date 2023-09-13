import { Dept } from '@app/database';

export interface TeamSchema {
  team_id: string;
  team_nm: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  // 📌 Relational Variables
  dept: Dept;
}
